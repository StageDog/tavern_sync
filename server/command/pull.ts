import { add_configs_to_command } from '@/component/add_config_selection_to_command';
import { Syncer_interface } from '@/syncer/interface';

import { Command } from 'commander';

export function add_pull_command(): Command {
  const command = new Command('pull').description('将酒馆内容拉取到本地');
  add_configs_to_command(command);
  command.action(async (syncer: Syncer_interface) => {
    await syncer.pull();
  });
  return command;
}
