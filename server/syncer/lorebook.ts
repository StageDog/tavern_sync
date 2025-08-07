import { watch_on } from '@/component/watch_on';
import { close_server, wait_socket } from '@/server';
import { Syncer_interface } from '@/syncer/interface';
import { Lorebook } from '@/types/lorebook.en';

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import YAML from 'yaml';

function beautingfy(entries: Lorebook): string {
  return YAML.stringify(entries);
}

export class Lorebook_syncer extends Syncer_interface {
  async pull() {
    const socket = await wait_socket();
    socket.emit('pull_lorebook', { lorebook: this.name }, (entries: Lorebook) => {
      mkdirSync(dirname(this.path), { recursive: true });
      writeFileSync(this.path, beautingfy(entries), {});
      console.info(`成功将世界书 '${this.name}' 拉取到本地文件 '${this.path}' 中`);
      close_server();
    });
  }

  private async push_once(): Promise<void> {
    const socket = await wait_socket();
    const entries = YAML.parse(readFileSync(this.path, 'utf-8'));
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
