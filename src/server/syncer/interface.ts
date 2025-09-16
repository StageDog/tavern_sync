import { is_collection_file } from '@server/component/collection_file';
import { watch_on } from '@server/component/watch_on';
import { wait_socket } from '@server/server';
import { exit_on_error } from '@server/util/exit_on_error';
import { detailed_parse } from '@server/util/prettified_parse';
import { translate } from '@server/util/translate';
import { write_file_recursively } from '@server/util/write_file_recursively';

import _ from 'lodash';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import YAML from 'yaml';
import { ZodType } from 'zod';

export interface Pull_options {
  language: 'zh' | 'en';
  should_split: boolean;
  should_force: boolean;
}

export interface Push_options {
  should_force: boolean;
  should_export: boolean;
}

export interface Watch_options {
  should_force: boolean;
}

export abstract class Syncer_interface {
  type: string;
  type_zh: string;
  config_name: string;
  name: string;
  file: string;
  export_file: string;
  dir: string;

  en_type: ZodType<any>;
  zh_type: ZodType<any>;
  zh_to_en_map: Record<string, string>;
  is_zh: (data: Record<string, any>) => boolean;
  tavern_type: ZodType<any>;

  constructor(
    type: string,
    type_zh: string,
    config_name: string,
    name: string,
    file: string,
    export_file: string,
    en_type: ZodType<any>,
    zh_type: ZodType<any>,
    zh_to_en_map: Record<string, string>,
    is_zh: (data: Record<string, any>) => boolean,
    tavern_type: ZodType<any>,
  ) {
    this.type = type;
    this.type_zh = type_zh;
    this.config_name = config_name;
    this.name = name;
    this.file = resolve(__dirname, file);
    this.export_file = resolve(__dirname, export_file);
    this.dir = dirname(this.file);

    this.en_type = en_type;
    this.zh_type = zh_type;
    this.zh_to_en_map = zh_to_en_map;
    this.is_zh = is_zh;
    this.tavern_type = tavern_type;
  }

  private async get_parsed_tavern({ queit = false }: { queit?: boolean } = {}): Promise<Record<string, any> | string> {
    const socket = await wait_socket();
    const data = await socket.emitWithAck(`pull_${this.type}`, { name: this.name, queit });
    return typeof data === 'string' ? data : detailed_parse(this.tavern_type, data);
  }

  private get_parsed_local(): Record<string, any> | string {
    if (!existsSync(this.file)) {
      return `配置文件 '${this.file}' 不存在`;
    }
    const content = readFileSync(this.file, 'utf-8');
    if (!/\S/.test(content)) {
      return `配置文件 '${this.file}' 为空`;
    }
    const data = YAML.parse(content, { merge: true });
    return this.is_zh(data)
      ? translate(detailed_parse(this.zh_type, data), this.zh_to_en_map)
      : detailed_parse(this.en_type, data);
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
  protected abstract do_pull(
    local_data: Record<string, any> | null,
    tavern_data: Record<string, any>,
    options: Omit<Pull_options, 'should_force'>,
  ): {
    result_data: Record<string, any>;
    files: {
      name: string;
      path: string;
      content: string;
    }[];
  };
  protected abstract do_beautify_config(tavern_data: Record<string, any>, language: 'zh' | 'en'): string;
  private beautify_config(tavern_data: Record<string, any>, language: 'zh' | 'en'): string {
    return `# yaml-language-server: $schema=https://testingcf.jsdelivr.net/gh/StageDog/tavern_sync/dist/schema/${this.type}.${language}.json
${this.do_beautify_config(tavern_data, language)}`;
  }
  async pull({ language, should_force, should_split }: Pull_options) {
    const tavern_data = await this.get_parsed_tavern();
    if (typeof tavern_data === 'string') {
      exit_on_error(`拉取${this.type_zh} '${this.name}' 失败: ${tavern_data}`);
    }

    const local_data: Record<string, any> | string = this.get_parsed_local();
    if (typeof local_data !== 'string' && !should_force) {
      const { error_data } = this.check_safe(local_data, tavern_data);
      if (!_.isEmpty(error_data)) {
        exit_on_error(
          YAML.stringify({ [`拉取${this.type_zh} '${this.name}' 失败`]: error_data }) +
            `如果想无视条目差异, 请在命令尾部添加 '-f' 或 '--force' 选项, 如: 'node tavern_sync.mjs pull 猴子打字机 -f'`,
        );
      }
    }

    const { result_data, files } = this.do_pull(typeof local_data === 'string' ? null : local_data, tavern_data, {
      language,
      should_split,
    });
    const collection_files = _(files)
      .remove(file => is_collection_file(file.path))
      .groupBy(file => resolve(this.dir, file.path))
      .map((files, path) => {
        let content = files.map(file => `# ^${file.name}\n` + file.content).join('\n');
        try {
          content = String(YAML.parseDocument(content));
        } catch (error) {
          // TODO: 如何报错
        }
        return {
          path,
          content: content,
        };
      })
      .value();
    write_file_recursively(this.dir, this.file, this.beautify_config(result_data, language));
    [...files, ...collection_files].forEach(({ path, content }) => {
      write_file_recursively(this.dir, path, content);
    });
    console.info(`成功将${this.type_zh} '${this.name}' 拉取到本地文件 '${this.file}' 中`);
  }

  protected abstract do_push(local_data: Record<string, any>): {
    result_data: Record<string, any>;
    error_data: Record<string, any>;
  };
  private async push_once({ should_force, should_export }: Push_options): Promise<void> {
    const local_data = this.get_parsed_local();
    if (typeof local_data === 'string') {
      throw Error(`推送${this.type_zh} '${this.name}' 失败: ${local_data}`);
    }

    if (!should_force) {
      const tavern_data = await this.get_parsed_tavern({ queit: true });
      if (typeof tavern_data === 'string') {
        throw Error(
          `推送${this.type_zh} '${this.name}' 失败: ${tavern_data}; 如果想直接创建预设, 请在命令尾部添加 '-f' 或 '--force' 选项, 如: 'node tavern_sync.mjs push 猴子打字机 -f'`,
        );
      }

      const { error_data } = this.check_safe(local_data, tavern_data);
      if (!_.isEmpty(error_data)) {
        throw Error(
          YAML.stringify({ [`推送${this.type_zh} '${this.name}' 失败`]: error_data }) +
            `如果想无视条目差异, 请在命令尾部添加 '-f' 或 '--force' 选项, 如: 'node tavern_sync.mjs push 猴子打字机 -f'`,
        );
      }
    }

    const { result_data, error_data } = this.do_push(local_data);
    if (!_.isEmpty(error_data)) {
      throw Error(YAML.stringify({ [`推送${this.type_zh} '${this.name}' 失败`]: error_data }));
    }

    const socket = await wait_socket();
    await socket.emitWithAck(`push_${this.type}`, {
      name: this.name,
      data: result_data,
    });

    if (should_export) {
      const result = await socket.emitWithAck(`export_${this.type}`, {
        name: this.name,
      });
      if (typeof result === 'string') {
        throw Error(`导出${this.type_zh} '${this.name}' 失败: ${result}`);
      }
      write_file_recursively(this.dir, this.export_file, JSON.stringify(result, null, 4));
    }
  }

  async push(options: Push_options) {
    try {
      await this.push_once(options);
    } catch (err) {
      const error = err as Error;
      exit_on_error(error.message);
    }
    console.info(`成功将${this.type_zh} '${this.name}' 在 '${this.file}' 中的本地内容推送到酒馆`);
  }

  protected abstract do_watch(local_data: Record<string, any>): string[];
  async watch(options: Watch_options) {
    const get_watch_files_from_data = () => {
      const local_data = this.get_parsed_local();
      if (typeof local_data === 'string') {
        exit_on_error(`监听${this.type_zh} '${this.name}' 失败: ${local_data}`);
      }
      return this.do_watch(local_data);
    };
    const watcher = watch_on(get_watch_files_from_data());

    await this.push_once({ ...options, should_export: false });
    console.info(`初始化推送完毕, 开始监听${this.type_zh} '${this.name}'`);

    watcher.on('all', async (_event, path) => {
      console.info(`检测到文件 '${path}' 发生变化, 进行推送...`);
      try {
        await this.push_once({ ...options, should_export: false });
        console.info(`推送成功`);
      } catch (err) {
        const error = err as Error;
        console.error(`${error.message}`);
      }
    });
  }
}
