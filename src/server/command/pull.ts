import { add_configs_to_command, add_language_to_command } from '@server/component/argument';
import { Syncer_interface } from '@server/syncer/interface';

import { Command } from 'commander';

export function add_pull_command(): Command {
  const command = new Command('pull').description('将酒馆内容拉取到本地');

  add_configs_to_command(command);
  add_language_to_command(command);
  command.option('-s, --split', '对配置的拉取应该将条目放在单独的文件中', false);

  command.action(async (syncer: Syncer_interface, options: { language: 'zh' | 'en' }) => {
    await syncer.pull({ language: options.language });
  });
  return command;
}
