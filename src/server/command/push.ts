import { add_configs_to_command } from '@server/component/argument';
import { Syncer_interface } from '@server/syncer/interface';

import { Command } from 'commander';

export function add_push_command(): Command {
  const command = new Command('push').description('将本地内容推送到酒馆');

  add_configs_to_command(command);
  command.option(
    '-f, --force',
    '强制推送: 如果本地文件中的条目名称或数量与酒馆中的不一致, 将会覆盖酒馆中的内容',
    false,
  );

  command.action(async (syncer: Syncer_interface, options: { force: boolean }) => {
    await syncer.push({ should_force: options.force });
  });
  return command;
}
