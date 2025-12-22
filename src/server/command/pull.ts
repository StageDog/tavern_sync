import { add_configs_to_command } from '@server/component/add_configs_to_command';
import { check_update_silently } from '@server/component/check_update';
import { close_server } from '@server/server';
import { Syncer_interface } from '@server/syncer/interface';

import { Command } from 'commander';

export function add_pull_command(): Command {
  const command = new Command('pull').description('将酒馆内容拉取到本地');

  add_configs_to_command(command);
  command.option('-l, --language <language>', '要使用的语言', 'zh');
  command.option(
    '-i, --inline',
    '内嵌提示词: 如果酒馆中有新增条目, 则该条目的提示词内容应该内嵌在配置文件中, 而不是拆成外链提示词文件',
    false,
  );
  command.option(
    '-f, --force',
    '强制拉取: 如果酒馆中的条目名称或数量与本地中的不一致, 将会覆盖本地文件中的内容',
    false,
  );

  command.action(
    async (syncers: Syncer_interface[], options: { language: 'zh' | 'en'; inline: boolean; force: boolean }) => {
      const update_abort_controller = new AbortController();
      check_update_silently(update_abort_controller.signal);
      try {
        await Promise.all(
          syncers.map(syncer =>
            syncer.pull({ language: options.language, should_split: !options.inline, should_force: options.force }),
          ),
        );
      } finally {
        update_abort_controller.abort();
      }
      close_server();
    },
  );
  return command;
}
