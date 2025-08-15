import { is_collection_file, parse_collection_file } from '@server/component/collection_file';
import { extract_file_content } from '@server/component/extract_file_content';
import { replace_raw_string } from '@server/component/replace_raw_string';
import { replace_user_name } from '@server/component/replace_user_name';
import { Pull_options, Syncer_interface } from '@server/syncer/interface';
import { Worldbook as Worldbook_tavern } from '@server/tavern/worldbook';
import { detect_extension } from '@server/util/detect_extension';
import { is_parent } from '@server/util/is_parent';
import { sanitize_filename } from '@server/util/sanitize_filename';
import { Worldbook as Worldbook_en } from '@type/worldbook.en';
import {
  Worldbook as Worldbook_zh,
  is_zh as worldbook_is_zh,
  zh_to_en_map as worldbook_zh_to_en_map,
} from '@type/worldbook.zh';

import { dirname, join, resolve } from 'node:path';
import YAML from 'yaml';

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

  // TODO: 拆分 component
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

  // TODO: 拆分 component
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
    let files: { name: string; path: string; content: string }[] = [];
    tavern_data.entries.forEach(entry => {
      const handle_file = (entry: Worldbook_tavern['entries'][number], file_path: string) => {
        files.push({ name: entry.name, path: file_path, content: entry.content });
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
    const collection_files = _(files)
      .remove(file => is_collection_file(file.path))
      .groupBy(file => resolve(this.dir, file.path))
      .map((files, path) => {
        let content = files.map(file => `# ^${file.name}\n` + file.content).join('\n');
        try {
          content = String(YAML.parseDocument(content));
        } catch (error) {
          // TODO: 如何报错
        }
        return {
          path,
          content: content,
        };
      })
      .value();
    return { result_data: tavern_data, files: [...files, ...collection_files] };
  }

  // TODO: 拆分 component
  protected do_push(local_data: Worldbook_en): { result_data: Record<string, any>; error_data: Record<string, any> } {
    let error_data = {
      未能找到以下外链提示词文件: [] as string[],
      未能从合集文件中找到以下条目: [] as string[],
    };

    local_data.entries.forEach((entry, index) => {
      if (entry.file === undefined) {
        return;
      }

      const content = extract_file_content(this.dir, entry.file!);
      if (content === null) {
        error_data.未能找到以下外链提示词文件.push(`第 '${index}' 条目 '${entry.name}': '${entry.file}'`);
        return;
      }
      if (is_collection_file(entry.file!)) {
        const collection_file = parse_collection_file(content);
        const collection_entry = collection_file.find(value => value.name === entry.name);
        if (collection_entry === undefined) {
          error_data.未能从合集文件中找到以下条目.push(`'${entry.file}': 第 '${index}' 条目 '${entry.name}'`);
          return;
        }
        _.set(entry, 'content', collection_entry.content);
        _.unset(entry, 'file');
        return;
      }
      _.set(entry, 'content', content);
      _.unset(entry, 'file');
    });
    local_data.entries.forEach(entry => {
      _.set(entry, 'content', replace_user_name(entry.content));
    });
    local_data.entries.forEach(entry => {
      _.set(entry, 'content', replace_raw_string(entry.content));
    });

    return {
      result_data: local_data,
      error_data: _.pickBy(error_data, value => value.length > 0),
    };
  }

  protected do_watch(local_data: Worldbook_en): string[] {
    return _(
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
      }, [])
      .concat(this.file);
  }
}
