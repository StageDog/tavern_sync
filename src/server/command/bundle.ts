import { add_configs_to_command } from '@server/component/add_configs_to_command';
import { check_update_silently } from '@server/component/check_update';
import { Syncer_interface } from '@server/syncer/interface';

import { Command } from 'commander';

export function add_bundle_command(): Command {
  const command = new Command('bundle').description("将本地内容打包到 '导出文件路径' 处");

  add_configs_to_command(command);

  command.action(async (syncers: Syncer_interface[]) => {
    check_update_silently();
    await Promise.all(syncers.map(syncer => syncer.bundle()));
  });
  return command;
}
