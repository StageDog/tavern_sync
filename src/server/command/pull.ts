import { Syncer_interface } from '@server/syncer/interface';
import { add_configs_to_command } from '@server/util/argument';

import { Command } from 'commander';

export function add_pull_command(): Command {
  const command = new Command('pull').description('将酒馆内容拉取到本地');

  add_configs_to_command(command);
  command.option('-l, --language <language>', '要使用的语言', 'zh');
  command.option('-s, --split', '拆分文件: 如果酒馆中有新增条目, 则它的内容应该放在单独的文件中', false);
  command.option(
    '-f, --force',
    '强制拉取: 如果酒馆中的条目名称或数量与本地中的不一致, 将会覆盖本地文件中的内容',
    false,
  );

  command.action(
    async (syncer: Syncer_interface, options: { language: 'zh' | 'en'; split: boolean; force: boolean }) => {
      await syncer.pull({ language: options.language, should_split: options.split, should_force: options.force });
    },
  );
  return command;
}
