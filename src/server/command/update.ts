import { check_update } from '@server/component/check_update';
import { exit_on_error } from '@server/util/exit_on_error';

import { Command } from 'commander';
import { readFileSync, writeFileSync } from 'node:fs';

export function add_update_command(): Command {
  const command = new Command('update').description('检查并更新本同步脚本');
  command.action(async () => {
    console.info('正在检查更新...');

    try {
      const result = await check_update();
      if (result === null) {
        console.info('当前版本已是最新版本，无需更新');
        return;
      }

      const backup_path = `${__filename}.backup`;
      try {
        const current_content = readFileSync(__filename, 'utf8');
        writeFileSync(backup_path, current_content);
        console.info(`已备份当前版本到: ${backup_path}`);
      } catch (error) {
        console.warn('无法创建备份文件，继续更新过程');
      }

      writeFileSync(__filename, result);
      console.info('更新成功! 请重新启动脚本以使用新版本');
    } catch (error) {
      exit_on_error(error as Error);
    }
  });
  return command;
}
