import { bundle_preset } from '@server/bundle/preset';
import { is_collection_file, parse_collection_file } from '@server/component/collection_file';
import { replace_raw_string } from '@server/component/replace_raw_string';
import { replace_user_name } from '@server/component/replace_user_name';
import { Pull_options, Syncer_interface } from '@server/syncer/interface';
import { Preset as Preset_tavern } from '@server/tavern/preset';
import { append_yaml_endline } from '@server/util/append_yaml_endline';
import { detect_extension } from '@server/util/detect_extension';
import { extract_file_content } from '@server/util/extract_file_content';
import { glob_file } from '@server/util/glob_file';
import { is_parent } from '@server/util/is_parent';
import { sanitize_filename } from '@server/util/sanitize_filename';
import { translate } from '@server/util/translate';
import { trim_yaml_endline } from '@server/util/trim_yaml_endline';
import { Preset as Preset_en, prompt_placeholder_ids } from '@type/preset.en';
import { is_zh as preset_is_zh, Preset as Preset_zh, zh_to_en_map as preset_zh_to_en_map } from '@type/preset.zh';
import { zh_to_en_map } from '@type/settings.zh';

import _ from 'lodash';
import { dirname, join, relative, resolve } from 'node:path';
import YAML from 'yaml';

export class Preset_syncer extends Syncer_interface {
  constructor(config_name: string, name: string, file: string, bundle_file: string | undefined) {
    super(
      'preset',
      _.invert(zh_to_en_map)['preset'],
      config_name,
      name,
      file,
      bundle_file,
      Preset_en,
      Preset_zh,
      preset_zh_to_en_map,
      preset_is_zh,
      Preset_tavern,
    );
  }

  // TODO: 拆分 component
  protected do_check_safe(
    local_data: Preset_en,
    tavern_data: Preset_tavern,
  ): { local_only_data: string[]; tavern_only_data: string[] } {
    const get_names = (data: Record<string, any>) => {
      return _(data.prompts)
        .concat(data.prompts_unused)
        .filter(prompt => !_.includes(prompt_placeholder_ids, _.get(prompt, 'id', '')))
        .map(prompt => prompt.name)
        .value();
    };
    const local_names = get_names(local_data);
    const tavern_names = get_names(tavern_data);
    return {
      local_only_data: _.difference(local_names, tavern_names),
      tavern_only_data: _.difference(tavern_names, local_names),
    };
  }

  // TODO: 拆分 component
  protected do_pull(
    local_data: Preset_en | null,
    tavern_data: Preset_tavern,
    { language, should_split }: Omit<Pull_options, 'should_force'>,
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

    const prompts_state: { name: string; content?: string; file?: string }[] =
      local_data === null
        ? []
        : [...local_data.prompts, ...local_data.prompts_unused].filter(prompt => !_.has(prompt, 'id'));

    const local_names = prompts_state.map(entry => entry.name);
    const tavern_names = [...tavern_data.prompts, ...tavern_data.prompts_unused]
      .filter(entry => entry.name !== undefined)
      .map(entry => entry.name);
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

    const convert_prompts = (prompts: Preset_tavern['prompts'], { used }: { used: boolean }) =>
      prompts.forEach(prompt => {
        if (_.has(prompt, 'id')) {
          return;
        }
        _.set(prompt, 'content', replace_user_name(prompt.content ?? ''));

        const handle_file = (prompt: Preset_tavern['prompts'][number], file: string) => {
          let file_to_write = '';
          let file_to_set = '';

          const glob_files = glob_file(this.dir, file);
          if (glob_files.length === 0) {
            file_to_write = file.replace(/\.[^\\/.]+$|$/, detect_extension(prompt.content!));
            file_to_set = file.replace(/\.[^\\/.]+$/, '');
          } else if (glob_files.length === 1) {
            file_to_write = glob_files[0];
            file_to_set = relative(this.dir, glob_files[0]).replace(/\.[^\\/.]+$/, '');
          } else {
            file_to_write = file;
            file_to_set = file;
          }

          files.push({ name: prompt.name, path: file_to_write, content: append_yaml_endline(prompt.content!) });
          _.unset(prompt, 'content');
          _.set(prompt, 'file', file_to_set);
        };

        const state = prompts_state.find(state => state.name === prompt.name);
        if (state === undefined && should_split) {
          const file = join(
            sanitize_filename(this.config_name),
            used ? '' : language === 'zh' ? '未使用' : 'unused',
            sanitize_filename(prompt.name) + detect_extension(prompt.content!),
          );
          handle_file(prompt, file);
          return;
        }
        if (state?.file !== undefined) {
          handle_file(prompt, state.file);
          return;
        }
      });
    convert_prompts(tavern_data.prompts, { used: true });
    convert_prompts(tavern_data.prompts_unused, { used: false });
    return { result_data: tavern_data, error_data: {}, files };
  }

  protected do_beautify_config(tavern_data: Preset_tavern, language: 'zh' | 'en'): string {
    const document = new YAML.Document(
      language === 'zh' ? translate(tavern_data, _.invert(this.zh_to_en_map)) : tavern_data,
    );
    [
      ['提示词'],
      ['未添加的提示词'],
      ['扩展字段', '正则'],
      ['扩展字段', '酒馆助手', '脚本库'],
      ['prompts'],
      ['prompts_unused'],
      ['extensions', 'regex_scripts'],
      ['extensions', 'tavern_helper', 'scripts'],
    ].forEach(key =>
      YAML.visit(document.getIn(key) as YAML.Node, (key, node) => {
        if (key === null) {
          return;
        }
        if ((key as number) > 0) {
          (node as YAML.Node).spaceBefore = true;
        }
        return YAML.visit.SKIP;
      }),
    );
    [['扩展字段'], ['扩展字段', '酒馆助手'], ['extensions'], ['extensions', 'tavern_helper']].forEach(key =>
      YAML.visit(document.getIn(key) as YAML.Node, (key, node) => {
        if (key === null) {
          return;
        }
        if (YAML.isPair(node) && (key as number) > 0) {
          (node.key as YAML.Node).spaceBefore = true;
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
  protected do_push(local_data: Preset_en): { result_data: Preset_en; error_data: Record<string, any> } {
    let error_data = {
      未能找到以下外链提示词文件: [] as string[],
      通过补全文件后缀找到了多个文件: [] as Record<string, string[]>[],
      未能从合集文件中找到以下条目: [] as string[],
    };

    const handle_placeholder_id = (prompts: Preset_en['prompts']) => {
      prompts.forEach(prompt => {
        if (_.includes(prompt_placeholder_ids, prompt.id)) {
          _.set(prompt, 'id', _.camelCase(prompt.id));
        }
      });
    };
    handle_placeholder_id(local_data.prompts);
    handle_placeholder_id(local_data.prompts_unused);

    const handle_file = (prompts: Preset_en['prompts'], source: string) => {
      prompts.forEach((prompt, index) => {
        if (!_.has(prompt, 'file') || prompt.file === undefined) {
          return;
        }

        const paths = glob_file(this.dir, prompt.file);
        if (paths.length === 0) {
          error_data.未能找到以下外链提示词文件.push(
            `'${source}' 中第 '${index}' 条目 '${prompt.name}': '${prompt.file}'`,
          );
          return;
        }
        if (paths.length > 1) {
          error_data.通过补全文件后缀找到了多个文件.push({
            [`'${source}' 中第 '${index}' 条目 '${prompt.name}'`]: paths,
          });
        }
        const content = extract_file_content(paths[0]);
        if (is_collection_file(prompt.file!)) {
          const collection_file = parse_collection_file(content);
          const collection_entry = collection_file.find(value => value.name === prompt.name);
          if (collection_entry === undefined) {
            error_data.未能从合集文件中找到以下条目.push(`'${prompt.file}': 第 '${index}' 条目 '${prompt.name}'`);
            return;
          }
          _.set(prompt, 'content', trim_yaml_endline(collection_entry.content));
          _.unset(prompt, 'file');
          return;
        }
        _.set(prompt, 'content', trim_yaml_endline(content));
        _.unset(prompt, 'file');
      });
    };
    handle_file(local_data.prompts, '提示词');
    handle_file(local_data.prompts_unused, '未添加的提示词');

    const handle_user_name = (prompts: Preset_en['prompts']) => {
      prompts.forEach(prompt => {
        _.set(prompt, 'content', replace_user_name(prompt.content!));
      });
    };
    handle_user_name(local_data.prompts);
    handle_user_name(local_data.prompts_unused);

    const handle_raw_string = (prompts: Preset_en['prompts']) => {
      prompts.forEach(prompt => {
        _.set(prompt, 'content', replace_raw_string(prompt.content));
      });
    };
    handle_raw_string(local_data.prompts);
    handle_raw_string(local_data.prompts_unused);

    return {
      result_data: local_data,
      error_data: _.pickBy(error_data, value => value.length > 0),
    };
  }

  protected do_watch(local_data: Preset_en): string[] {
    return _(
      _(local_data.prompts)
        .concat(local_data.prompts_unused)
        .filter(prompt => prompt.file !== undefined)
        .map(prompt => resolve(this.dir, prompt.file!))
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

  protected do_bundle(local_data: Preset_en): { result_data: Record<string, any>; error_data: Record<string, any> } {
    const { result_data, error_data } = this.do_push(local_data);
    return { result_data: bundle_preset(result_data), error_data };
  }
}
