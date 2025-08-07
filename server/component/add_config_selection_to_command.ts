import { beauingfy_configs } from '@/component/beauingfy_configs';
import { get_settings } from '@/settings';
import { create_syncer } from '@/syncer/factory';
import { exit_on_error } from '@/util/exit_on_error';

import { Argument, Command } from 'commander';

export function add_configs_to_command(command: Command): Command {
  const settings = get_settings();
  command.addArgument(
    new Argument('<config>', '配置名称').choices(Object.keys(settings.configs)).argParser(value => {
      if (!(value in settings.configs)) {
        exit_on_error(`配置 '${value}' 不存在, ${beauingfy_configs()}`);
      }
      return create_syncer(settings.configs[value]);
    }),
  );
  return command;
}
