import { exit_on_error } from '@/util/exit_on_error';

import { Command } from 'commander';
import { readFileSync, writeFileSync } from 'node:fs';

async function download_latest() {
  const url = 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_sync/dist/tavern_sync.js';
  const response = await fetch(url);
  if (!response.ok) {
    exit_on_error(`无法获取远程文件: HTTP ${response.status} ${response.statusText}`);
  }
  return response.text();
}

export function add_update_command(): Command {
  const command = new Command('update').description('检查并更新本同步脚本');
  command.action(async () => {
    console.info('正在检查更新...');

    try {
      const current_content = readFileSync(__filename, 'utf8');
      const remote_content = await download_latest();

      if (current_content === remote_content) {
        console.info('当前版本已是最新版本，无需更新');
        return;
      }
      console.info('发现新版本，正在更新...');

      const backupPath = `${__filename}.backup`;
      try {
        const currentContent = readFileSync(__filename, 'utf8');
        writeFileSync(backupPath, currentContent);
        console.info(`已备份当前版本到: ${backupPath}`);
      } catch (error) {
        console.warn('无法创建备份文件，继续更新过程');
      }

      writeFileSync(__filename, remote_content);
      console.info('更新成功! 请重新启动脚本以使用新版本');
    } catch (err) {
      const error = err as Error;
      console.error('更新失败: ', error.message);
      process.exit(1);
    }
  });
  return command;
}
