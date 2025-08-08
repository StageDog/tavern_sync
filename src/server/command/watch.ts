import { add_configs_to_command } from '@server/component/argument';
import { Syncer_interface } from '@server/syncer/interface';

import { Command } from 'commander';

export function add_watch_command(): Command {
  const command = new Command('watch').description('监听本地内容的变化并实时推送到酒馆');

  add_configs_to_command(command);

  command.action(async (syncer: Syncer_interface) => {
    await syncer.watch();
  });
  return command;
}
