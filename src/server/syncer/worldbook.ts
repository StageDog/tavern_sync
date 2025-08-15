import { Pull_options, Syncer_interface } from '@server/syncer/interface';
import { Worldbook as Worldbook_tavern } from '@server/tavern/worldbook';
import { detect_extension } from '@server/util/detect_extension';
import { extract_file_content } from '@server/util/extract_file_content';
import { is_parent } from '@server/util/is_parent';
import { sanitize_filename } from '@server/util/sanitize_filename';
import { Worldbook as Worldbook_en } from '@type/worldbook.en';
import {
  Worldbook as Worldbook_zh,
  is_zh as worldbook_is_zh,
  zh_to_en_map as worldbook_zh_to_en_map,
} from '@type/worldbook.zh';

import { dirname, join, resolve } from 'node:path';

export class Worldbook_syncer extends Syncer_interface {
  constructor(type: string, type_zh: string, name: string, file: string) {
    super(
      type,
      type_zh,
      name,
      file,
      Worldbook_en,
      Worldbook_zh,
      worldbook_zh_to_en_map,
      worldbook_is_zh,
      Worldbook_tavern,
    );
  }

  protected do_check_safe(
    local_data: Worldbook_en,
    tavern_data: Worldbook_tavern,
  ): { local_only_data: string[]; tavern_only_data: string[] } {
    const local_names = local_data.entries.map(entry => entry.name);
    const tavern_names = tavern_data.entries.map(entry => entry.name);
    return {
      local_only_data: _.difference(local_names, tavern_names),
      tavern_only_data: _.difference(tavern_names, local_names),
    };
  }

  protected do_pull(
    local_data: Worldbook_en | null,
    tavern_data: Worldbook_tavern,
    { should_split }: Omit<Pull_options, 'should_force'>,
  ): {
    result_data: Record<string, any>;
    files: {
      path: string;
      content: string;
    }[];
  } {
    const entries_state: { name: string; content?: string; file?: string }[] =
      local_data === null
        ? tavern_data.entries.map(entry =>
            should_split
              ? {
                  name: entry.name,
                  file: join(this.name, sanitize_filename(entry.name) + detect_extension(entry.content!)),
                }
              : { name: entry.name, content: entry.content },
          )
        : local_data.entries;
    let files: { path: string; content: string }[] = [];
    tavern_data.entries.forEach(entry => {
      const handle_file = (entry: Worldbook_tavern['entries'][number], file_path: string) => {
        files.push({ path: file_path, content: entry.content });
        _.unset(entry, 'content');
        _.set(entry, 'file', file_path);
      };

      const state = entries_state.find(state => state.name === entry.name);
      if (state === undefined && should_split) {
        const file_path = join('.', this.name, sanitize_filename(entry.name)) + detect_extension(entry.content!);
        handle_file(entry, file_path);
        return;
      }
      if (state?.file !== undefined) {
        handle_file(entry, state.file);
      }
    });
    return { result_data: tavern_data, files };
  }

  protected do_push(local_data: Worldbook_en): { result_data: Record<string, any>; error_data: Record<string, any> } {
    let errors: string[] = [];

    local_data.entries.forEach((entry, index) => {
      if (entry.file === undefined) {
        return;
      }

      const content = extract_file_content(this.dir, entry.file!);
      if (content === null) {
        errors.push(`条目 '${index}' 的 '${entry.file}'`);
      } else {
        _.set(entry, 'content', content);
        _.unset(entry, 'file');
      }
    });

    return {
      result_data: local_data,
      error_data:
        errors.length === 0
          ? {}
          : {
              未找到以下外链提示词文件: errors,
            },
    };
  }

  protected do_watch(local_data: Worldbook_en): string[] {
    return _([this.file])
      .concat(
        _(local_data.entries)
          .filter(entry => entry.file !== undefined)
          .map(entry => resolve(this.dir, entry.file!))
          .value(),
      )
      .map(path => dirname(path))
      .reduce((result: string[], path: string) => {
        if (result.some(parent => is_parent(parent, path))) {
          return result;
        }
        result.push(path);
        return result;
      }, []);
  }
}
