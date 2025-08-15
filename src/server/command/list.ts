import { beauingfy_configs } from '@server/util/beauingfy_configs';

import { Command } from 'commander';

export function add_list_command(): Command {
  const command = new Command('list').description('列出所有可用的配置');
  command.action(() => {
    console.info(beauingfy_configs());
  });
  return command;
}
