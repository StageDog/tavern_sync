import { add_configs_to_command } from '@/component/argument';
import { Syncer_interface } from '@/syncer/interface';

import { Command } from 'commander';

export function add_push_command(): Command {
  const command = new Command('push').description('将本地内容推送到酒馆');

  add_configs_to_command(command);

  command.action(async (syncer: Syncer_interface) => {
    await syncer.push();
  });
  return command;
}
