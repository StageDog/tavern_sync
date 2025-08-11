import { watch_on } from '@server/component/watch_on';
import { close_server, wait_socket } from '@server/server';
import { Pull_options, Syncer_interface } from '@server/syncer/interface';
import { from_zh, to_zh } from '@server/translator/worldbook';
import { write_file_recursively } from '@server/util/write_file_recursively';
import { Worldbook as Worldbook_en } from '@type/worldbook.en';
import { Worldbook as Worldbook_original } from '@type/worldbook.original';

import { readFileSync } from 'node:fs';
import YAML from 'yaml';

function beautingfy(worldbook: Worldbook_original, language: 'zh' | 'en'): string {
  const schema_url = `https://testingcf.jsdelivr.net/gh/StageDog/tavern_sync/dist/schema/worldbook.${language}.json`;
  let result = `# yaml-language-server: $schema=${schema_url}\n`;
  result += YAML.stringify(language === 'en' ? worldbook : to_zh(worldbook, { should_check: false }));
  return result;
}

export class Worldbook_syncer extends Syncer_interface {
  async pull({ language }: Pull_options) {
    const socket = await wait_socket();
    socket.emit('pull_worldbook', { worldbook_name: this.name }, (worldbook: Record<string, any>) => {
      write_file_recursively(this.path, beautingfy(Worldbook_original.parse(worldbook), language));
      console.info(`成功将世界书 '${this.name}' 拉取到本地文件 '${this.path}' 中`);
      close_server();
    });
  }

  private async push_once(): Promise<void> {
    const socket = await wait_socket();

    const data = YAML.parse(readFileSync(this.path, 'utf-8'));
    const worldbook = _.has(data, '[0].名称') ? from_zh(data) : Worldbook_en.parse(data);
    return await socket.emitWithAck('push_worldbook', { worldbook_name: this.name, worldbook });
  }

  async push() {
    await this.push_once();
    console.info(`成功将世界书 '${this.name}' 在 '${this.path}' 中的本地内容推送到酒馆`);
    close_server();
  }

  async watch() {
    const watcher = watch_on(this.path);
    watcher.on('ready', async () => {
      await this.push_once();
      console.info(`开始监听世界书 '${this.name}', 初始化推送...`);
    });
    watcher.on('all', async (_event, path) => {
      console.info(`检测到文件 '${path}' 发生变化, 进行推送...`);
      await this.push_once();
    });
  }
}
