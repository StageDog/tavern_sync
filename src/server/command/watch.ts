import { beauingfy_configs } from '@server/component/beauingfy_configs';
import { check_update_silently } from '@server/component/check_update';
import { get_settings } from '@server/settings';
import { create_syncer } from '@server/syncer/factory';
import { exit_on_error } from '@server/util/exit_on_error';

import { Argument, Command } from 'commander';

export function add_watch_command(): Command {
  const command = new Command('watch').description('监听本地内容的变化并实时推送到酒馆');

  const settings = get_settings();
  command.addArgument(
    new Argument('[config]', '配置名称, 不填则监听所有配置').choices(Object.keys(settings.configs)).argParser(value => {
      if (!(value in settings.configs)) {
        exit_on_error(`配置 '${value}' 不存在, ${beauingfy_configs()}`);
      }
    }),
  );
  command.option(
    '-f, --force',
    '强制推送: 如果本地文件中的条目名称或数量与酒馆中的不一致, 将会覆盖酒馆中的内容',
    false,
  );

  command.action(async (config: string, options: { force: boolean }) => {
    const timeout_id = check_update_silently();
    if (config) {
      await create_syncer(config, settings.configs[config]).watch({ should_force: options.force });
    } else {
      for (const config of Object.keys(settings.configs)) {
        await create_syncer(config, settings.configs[config]).watch({ should_force: options.force });
      }
    }
    clearTimeout(timeout_id);
  });
  return command;
}
