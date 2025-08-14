import { watch_on } from '@server/component/watch_on';
import { close_server, wait_socket } from '@server/server';
import { exit_on_error } from '@server/util/exit_on_error';
import { translate } from '@server/util/translate';
import { write_file_recursively } from '@server/util/write_file_recursively';
import _ from 'lodash';

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import YAML from 'yaml';
import { ZodType } from 'zod';

export interface Pull_options {
  language: 'zh' | 'en';
  should_force: boolean;
}

export interface Push_options {
  should_force: boolean;
}

export interface Watch_options {
  should_force: boolean;
}

export abstract class Syncer_interface {
  type: string;
  type_zh: string;
  name: string;
  file: string;

  en_type: ZodType<any>;
  zh_type: ZodType<any>;
  zh_to_en_map: Record<string, string>;
  is_zh: (data: Record<string, any>) => boolean;
  tavern_type: ZodType<any>;

  constructor(
    type: string,
    type_zh: string,
    name: string,
    file: string,
    en_type: ZodType<any>,
    zh_type: ZodType<any>,
    zh_to_en_map: Record<string, string>,
    is_zh: (data: Record<string, any>) => boolean,
    tavern_type: ZodType<any>,
  ) {
    this.type = type;
    this.type_zh = type_zh;
    this.name = name;
    this.file = resolve(__dirname, file);

    this.en_type = en_type;
    this.zh_type = zh_type;
    this.zh_to_en_map = zh_to_en_map;
    this.is_zh = is_zh;
    this.tavern_type = tavern_type;
  }

  private async get_parsed_tavern(): Promise<Record<string, any> | string> {
    const socket = await wait_socket();
    const data = await socket.emitWithAck(`pull_${this.type}`, { name: this.name });
    return typeof data === 'string' ? data : this.tavern_type.parse(data);
  }

  private async get_parsed_local(): Promise<Record<string, any> | string> {
    if (!existsSync(this.file)) {
      return `配置文件 '${this.file}' 不存在`;
    }
    const data = YAML.parse(readFileSync(this.file, 'utf-8'));
    return this.is_zh(data) ? translate(this.zh_type.parse(data), this.zh_to_en_map) : this.en_type.parse(data);
  }

  private beautingfy(data: Record<string, any>, language: 'zh' | 'en'): string {
    const schema_url = `https://testingcf.jsdelivr.net/gh/StageDog/tavern_sync/dist/schema/${this.type}.${language}.json`;
    let result = `# yaml-language-server: $schema=${schema_url}\n`;
    result += YAML.stringify(language === 'en' ? data : translate(data, _.invert(this.zh_to_en_map)), {
      blockQuote: 'literal',
    });
    return result;
  }

  protected abstract do_check_safe(
    local_data: Record<string, any>,
    tavern_data: Record<string, any>,
  ): {
    local_only_data: string[];
    tavern_only_data: string[];
  };
  private check_safe(
    local_data: Record<string, any>,
    tavern_data: Record<string, any>,
  ): { local_only_data: string[]; tavern_only_data: string[]; error_data: Record<string, any> } {
    const { local_only_data, tavern_only_data } = this.do_check_safe(local_data, tavern_data);
    let error_data = _({});
    if (local_only_data.length > 0) {
      error_data = error_data.set([`本地文件 '${this.file}' 中存在以下条目, 但酒馆中不存在`], local_only_data);
    }
    if (tavern_only_data.length > 0) {
      error_data = error_data.set([`酒馆中存在以下条目, 但本地文件 '${this.file}' 中不存在`], tavern_only_data);
    }
    return { local_only_data, tavern_only_data, error_data: error_data.value() };
  }

  async pull({ language, should_force }: Pull_options) {
    const tavern_data = await this.get_parsed_tavern();
    if (typeof tavern_data === 'string') {
      return exit_on_error(`拉取${this.type_zh} '${this.name}' 失败: ${tavern_data}`);
    }

    if (existsSync(this.file) && !should_force) {
      const local_data = await this.get_parsed_local();
      if (typeof local_data === 'string') {
        return exit_on_error(`拉取${this.type_zh} '${this.name}' 失败: ${local_data}`);
      }

      const { error_data } = this.check_safe(local_data, tavern_data);
      if (!_.isEmpty(error_data)) {
        return exit_on_error(YAML.stringify({ [`拉取${this.type_zh} '${this.name}' 失败`]: error_data }));
      }
    }

    write_file_recursively(this.file, this.beautingfy(tavern_data, language));
    console.info(`成功将世界书 '${this.name}' 拉取到本地文件 '${this.file}' 中`);
    close_server();
  }

  private async push_once({ should_force }: Push_options): Promise<void> {
    const local_data = await this.get_parsed_local();
    if (typeof local_data === 'string') {
      return exit_on_error(`推送${this.type_zh} '${this.name}' 失败: ${local_data}`);
    }

    if (!should_force) {
      const tavern_data = await this.get_parsed_tavern();
      if (typeof tavern_data === 'string') {
        return exit_on_error(`推送${this.type_zh} '${this.name}' 失败: ${tavern_data}`);
      }

      const { error_data } = this.check_safe(local_data, tavern_data);
      if (!_.isEmpty(error_data)) {
        return exit_on_error(YAML.stringify({ [`推送${this.type_zh} '${this.name}' 失败`]: error_data }));
      }
    }

    const socket = await wait_socket();
    await socket.emitWithAck(`push_${this.type}`, {
      name: this.name,
      data: local_data,
    });
  }

  async push(options: Push_options) {
    console.info(`开始推送... (如果等待时间超过 3 秒, 请刷新酒馆网页或检查酒馆助手脚本库里的脚本是否开启)`);
    await this.push_once(options);
    console.info(`成功将${this.type_zh} '${this.name}' 在 '${this.file}' 中的本地内容推送到酒馆`);
    close_server();
  }

  async watch(options: Watch_options) {
    const watcher = watch_on(this.file);

    watcher.on('ready', async () => {
      await this.push_once(options);
      console.info(
        `开始监听${this.type_zh} '${this.name}', 初始化推送... (如果等待时间超过 3 秒, 请刷新酒馆网页或检查酒馆助手脚本库里的脚本是否开启)`,
      );
    });

    watcher.on('all', async (_event, path) => {
      console.info(
        `检测到文件 '${path}' 发生变化, 进行推送... (如果等待时间超过 3 秒, 请刷新酒馆网页或检查酒馆助手脚本库里的脚本是否开启)`,
      );
      try {
        await this.push_once(options);
        console.info(`推送成功`);
      } catch (err) {
        const error = err as Error;
        console.error(`推送${this.type_zh} '${this.name}' 失败: ${error}`);
      }
    });
  }
}
