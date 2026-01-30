import { bundle_worldbook } from '@server/bundle/worldbook';
import { is_collection_file, parse_collection_file } from '@server/component/collection_file';
import { replace_raw_string } from '@server/component/replace_raw_string';
import { replace_user_name } from '@server/component/replace_user_name';
import { Pull_options, Syncer_interface } from '@server/syncer/interface';
import { Worldbook as Worldbook_tavern } from '@server/tavern/worldbook';
import { append_yaml_endline } from '@server/util/append_yaml_endline';
import { detect_extension } from '@server/util/detect_extension';
import { extract_file_content } from '@server/util/extract_file_content';
import { glob_file } from '@server/util/glob_file';
import { is_parent } from '@server/util/is_parent';
import { sanitize_filename } from '@server/util/sanitize_filename';
import { translate } from '@server/util/translate';
import { trim_yaml_endline } from '@server/util/trim_yaml_endline';
import { zh_to_en_map } from '@type/settings.zh';
import { Worldbook as Worldbook_en } from '@type/worldbook.en';
import {
  is_zh as worldbook_is_zh,
  Worldbook as Worldbook_zh,
  zh_to_en_map as worldbook_zh_to_en_map,
} from '@type/worldbook.zh';

import _ from 'lodash';
import { dirname, join, relative, resolve } from 'node:path';
import YAML from 'yaml';

export class Worldbook_syncer extends Syncer_interface {
  constructor(config_name: string, name: string, file: string, bundle_file: string) {
    super(
      'worldbook',
      _.invert(zh_to_en_map)['worldbook'],
      config_name,
      name,
      file,
      bundle_file,
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
    error_data: Record<string, any>;
    files: {
      name: string;
      path: string;
      content: string;
    }[];
  } {
    let files: { name: string; path: string; content: string }[] = [];

    const entries_state: { name: string; content?: string; file?: string }[] =
      local_data === null ? [] : local_data.entries;

    const local_names = entries_state.map(entry => entry.name);
    const tavern_names = tavern_data.entries.map(entry => entry.name);
    const duplicated_names = _(tavern_names)
      .filter(name => {
        const index = local_names.findIndex(n => n === name);
        if (index !== -1) {
          local_names.splice(index, 1);
          return false;
        }
        return true;
      })
      .countBy()
      .pickBy(count => count > 1)
      .keys()
      .uniq()
      .sort()
      .value();
    if (duplicated_names.length > 0) {
      return { result_data: {}, error_data: { 以下条目存在同名条目: duplicated_names }, files: [] };
    }

    tavern_data.entries.forEach(entry => {
      _.set(entry, 'content', replace_user_name(entry.content ?? ''));

      const handle_file = (entry: Worldbook_tavern['entries'][number], file: string) => {
        let file_to_write = '';
        let file_to_set = '';

        const glob_files = glob_file(this.dir, file);
        if (glob_files.length === 0) {
          file_to_write = file.replace(/\.[^\\/.]+$|$/, detect_extension(entry.content));
          file_to_set = file.replace(/\.[^\\/.]+$/, '');
        } else if (glob_files.length === 1) {
          file_to_write = glob_files[0];
          file_to_set = relative(this.dir, glob_files[0]).replace(/\.[^\\/.]+$/, '');
        } else {
          file_to_write = file;
          file_to_set = file;
        }

        files.push({
          name: entry.name,
          path: file_to_write,
          content: append_yaml_endline(entry.content),
        });
        _.unset(entry, 'content');
        _.set(entry, 'file', file_to_set);
      };

      const state = entries_state.find(state => state.name === entry.name);
      if (state === undefined && should_split) {
        handle_file(
          entry,
          join(sanitize_filename(this.config_name), sanitize_filename(entry.name) + detect_extension(entry.content)),
        );
      } else if (state?.file !== undefined) {
        handle_file(entry, state.file);
      }
    });

    return { result_data: tavern_data, error_data: {}, files };
  }

  // TODO: 拆分 component
  protected do_beautify_config(tavern_data: Worldbook_tavern, language: 'zh' | 'en'): string {
    const document = new YAML.Document(
      language === 'zh' ? translate(tavern_data, _.invert(this.zh_to_en_map)) : tavern_data,
    );
    ['条目', 'entries'].forEach(key =>
      YAML.visit(document.get(key) as YAML.Node, (key, node) => {
        if (key === null) {
          return;
        }
        if ((key as number) > 0) {
          (node as YAML.Node).spaceBefore = true;
        }
        return YAML.visit.SKIP;
      }),
    );
    YAML.visit(document, (key, node) => {
      if (key === null) {
        return;
      }
      if (YAML.isPair(node) && (key as number) > 0) {
        (node.key as YAML.Node).spaceBefore = true;
      }
      return YAML.visit.SKIP;
    });
    return document.toString({ blockQuote: 'literal' });
  }

  // TODO: 拆分 component
  protected do_push(local_data: Worldbook_en): { result_data: Worldbook_en; error_data: Record<string, any> } {
    let error_data = {
      未能找到以下外链提示词文件: [] as string[],
      通过补全文件后缀找到了多个文件: [] as Record<string, string[]>[],
      未能从合集文件中找到以下条目: [] as string[],
    };

    local_data.entries.forEach((entry, index) => {
      if (entry.file === undefined) {
        return;
      }

      const paths = glob_file(this.dir, entry.file);
      if (paths.length === 0) {
        error_data.未能找到以下外链提示词文件.push(`第 '${index}' 条目 '${entry.name}': '${entry.file}'`);
        return;
      }
      if (paths.length > 1) {
        error_data.通过补全文件后缀找到了多个文件.push({ [`第 '${index}' 条目 '${entry.name}'`]: paths });
        return;
      }
      const content = extract_file_content(paths[0]);
      if (is_collection_file(entry.file!)) {
        const collection_file = parse_collection_file(content);
        const collection_entry = collection_file.find(value => value.name === entry.name);
        if (collection_entry === undefined) {
          error_data.未能从合集文件中找到以下条目.push(`'${entry.file}': 第 '${index}' 条目 '${entry.name}'`);
          return;
        }
        _.set(entry, 'content', trim_yaml_endline(collection_entry.content));
        _.unset(entry, 'file');
        return;
      }
      _.set(entry, 'content', trim_yaml_endline(content));
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

  protected do_bundle(local_data: Worldbook_en): { result_data: Record<string, any>; error_data: Record<string, any> } {
    const { result_data, error_data } = this.do_push(local_data);
    return { result_data: bundle_worldbook(result_data), error_data };
  }
}
