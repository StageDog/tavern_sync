import { add_configs_to_command } from '@server/component/add_configs_to_command';
import { check_update_silently } from '@server/component/check_update';
import { close_server } from '@server/server';
import { Syncer_interface } from '@server/syncer/interface';

import { Command } from 'commander';

export function add_push_command(): Command {
  const command = new Command('push').description('将本地内容推送到酒馆');

  add_configs_to_command(command);
  command.option(
    '-f, --force',
    '强制推送: 如果本地文件中的条目名称或数量与酒馆中的不一致, 将会覆盖酒馆中的内容',
    false,
  );
  command.option(
    '-e, --export',
    "导出结果: 将推送结果导出为 JSON 文件, 存放在配置文件中 '导出文件路径 (export_file)' 所指定路径下; 如果没有填写 '导出文件路径', 则存放在与 '本地文件路径 (file)' 同目录下",
    false,
  );

  command.action(async (syncers: Syncer_interface[], options: { force: boolean; export: boolean }) => {
    check_update_silently();
    await Promise.all(syncers.map(syncer => syncer.push({ should_force: options.force, should_export: options.export })));
    close_server();
  });
  return command;
}
