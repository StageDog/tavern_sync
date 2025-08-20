import { add_configs_to_command } from '@server/component/add_configs_to_command';
import { check_update_silently } from '@server/component/check_update';
import { Syncer_interface } from '@server/syncer/interface';

import { Command } from 'commander';

export function add_watch_command(): Command {
  const command = new Command('watch').description('监听本地内容的变化并实时推送到酒馆');

  add_configs_to_command(command);
  command.option(
    '-f, --force',
    '强制推送: 如果本地文件中的条目名称或数量与酒馆中的不一致, 将会覆盖酒馆中的内容',
    false,
  );

  command.action(async (syncers: Syncer_interface[], options: { force: boolean }) => {
    const timeout_id = check_update_silently();
    await Promise.all(syncers.map(syncer => syncer.watch({ should_force: options.force })));
    clearTimeout(timeout_id);
  });
  return command;
}
