import { add_configs_to_command } from '@server/component/argument';
import { Syncer_interface } from '@server/syncer/interface';

import { Command } from 'commander';

export function add_pull_command(): Command {
  const command = new Command('pull').description('将酒馆内容拉取到本地');

  add_configs_to_command(command);
  command.option('-l, --language <language>', '要使用的语言', 'zh');
  command.option(
    '-m, --merge',
    '合并文件: 如果酒馆中有新增条目, 则该条目的提示词内容应该内嵌在配置文件中, 而不是拆成外链提示词文件',
    false,
  );
  command.option(
    '-f, --force',
    '强制拉取: 如果酒馆中的条目名称或数量与本地中的不一致, 将会覆盖本地文件中的内容',
    false,
  );

  command.action(
    async (syncer: Syncer_interface, options: { language: 'zh' | 'en'; merge: boolean; force: boolean }) => {
      await syncer.pull({ language: options.language, should_split: !options.merge, should_force: options.force });
    },
  );
  return command;
}
