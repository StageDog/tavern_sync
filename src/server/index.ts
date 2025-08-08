import { add_list_command } from '@server/command/list';
import { add_pull_command } from '@server/command/pull';
import { add_push_command } from '@server/command/push';
import { add_update_command } from '@server/command/update';
import { add_watch_command } from '@server/command/watch';

import { program } from 'commander';
import * as z from 'zod';

z.config(z.locales.zhCN());
program
  .name('世界书同步脚本')
  .addCommand(add_list_command())
  .addCommand(add_pull_command())
  .addCommand(add_push_command())
  .addCommand(add_update_command())
  .addCommand(add_watch_command())
  .showHelpAfterError(true)
  .showSuggestionAfterError(true)
  .parse();
