import { watch_on } from '@server/component/watch_on';
import { close_server, wait_socket } from '@server/server';
import { exit_on_error } from '@server/util/exit_on_error';
import { translate } from '@server/util/translate';
import { write_file_recursively } from '@server/util/write_file_recursively';

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import YAML from 'yaml';
import { ZodType } from 'zod';

export interface Pull_options {
  language: 'zh' | 'en';
}

export abstract class Syncer_interface {
  type: string;
  type_zh: string;
  name: string;
  path: string;

  en_type: ZodType<any>;
  zh_type: ZodType<any>;
  zh_to_en_map: Record<string, string>;
  is_zh: (data: Record<string, any>) => boolean;
  tavern_type: ZodType<any>;

  constructor(
    type: string,
    type_zh: string,
    name: string,
    path: string,
    en_type: ZodType<any>,
    zh_type: ZodType<any>,
    zh_to_en_map: Record<string, string>,
    is_zh: (data: Record<string, any>) => boolean,
    tavern_type: ZodType<any>,
  ) {
    this.type = type;
    this.type_zh = type_zh;
    this.name = name;
    this.path = resolve(__dirname, path);

    this.en_type = en_type;
    this.zh_type = zh_type;
    this.zh_to_en_map = zh_to_en_map;
    this.is_zh = is_zh;
    this.tavern_type = tavern_type;
  }

  private beautingfy(data: Record<string, any>, language: 'zh' | 'en'): string {
    const schema_url = `https://testingcf.jsdelivr.net/gh/StageDog/tavern_sync/dist/schema/${this.type}.${language}.json`;
    let result = `# yaml-language-server: $schema=${schema_url}\n`;
    result += YAML.stringify(language === 'en' ? data : translate(data, _.invert(this.zh_to_en_map)));
    return result;
  }

  async pull({ language }: Pull_options) {
    const socket = await wait_socket();
    socket.emit(`pull_${this.type}`, { name: this.name }, (data: Record<string, any> | Error) => {
      if (data instanceof Error) {
        exit_on_error(`拉取${this.type_zh} '${this.name}' 失败: ${data}`);
      }
      write_file_recursively(this.path, this.beautingfy(this.tavern_type.parse(data), language));
      console.info(`成功将世界书 '${this.name}' 拉取到本地文件 '${this.path}' 中`);
      close_server();
    });
  }

  private async push_once(): Promise<void> {
    const socket = await wait_socket();
    const data = YAML.parse(readFileSync(this.path, 'utf-8'));
    return await socket.emitWithAck(`push_${this.type}`, {
      name: this.name,
      data: this.is_zh(data) ? translate(this.zh_type.parse(data), this.zh_to_en_map) : this.en_type.parse(data),
    });
  }

  async push() {
    await this.push_once();
    console.info(`成功将${this.type_zh} '${this.name}' 在 '${this.path}' 中的本地内容推送到酒馆`);
    close_server();
  }

  async watch() {
    const watcher = watch_on(this.path);
    watcher.on('ready', async () => {
      await this.push_once();
      console.info(`开始监听${this.type_zh} '${this.name}', 初始化推送...`);
    });
    watcher.on('all', async (_event, path) => {
      console.info(`检测到文件 '${path}' 发生变化, 进行推送...`);
      await this.push_once();
    });
  }
}
