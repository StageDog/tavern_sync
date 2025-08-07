import { add_list_command } from '@/command/list';
import { add_pull_command } from '@/command/pull';
import { add_push_command } from '@/command/push';
import { add_update_command } from '@/command/update';
import { add_watch_command } from '@/command/watch';

import { program } from 'commander';

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
