import { watch_on } from '@server/component/watch_on';
import { close_server, wait_socket } from '@server/server';
import { Pull_options, Syncer_interface } from '@server/syncer/interface';
import { Lorebook } from '@type/lorebook.en';

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import YAML from 'yaml';

function beautingfy(entries: Lorebook, language: 'en' | 'zh'): string {
  const schema_url = `https://testingcf.jsdelivr.net/gh/StageDog/tavern_sync/dist/schema/lorebook.${language}.json`;
  let result = `# yaml-language-server: $schema=${schema_url}\n`;
  // TODO: zh
  result += YAML.stringify(entries);
  return result;
}

export class Lorebook_syncer extends Syncer_interface {
  async pull({ language }: Pull_options) {
    const socket = await wait_socket();
    socket.emit('pull_lorebook', { lorebook: this.name }, (entries: Lorebook) => {
      mkdirSync(dirname(this.path), { recursive: true });
      writeFileSync(this.path, beautingfy(entries, language), {});

      console.info(`成功将世界书 '${this.name}' 拉取到本地文件 '${this.path}' 中`);

      close_server();
    });
  }

  private async push_once(): Promise<void> {
    const socket = await wait_socket();
    // TODO: zh
    const entries = Lorebook.parse(YAML.parse(readFileSync(this.path, 'utf-8')));
    return await socket.emitWithAck('push_lorebook', { lorebook: this.name, entries });
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
