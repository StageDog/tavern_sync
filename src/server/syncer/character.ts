import encode, { bundle_character } from '@server/bundle/character';
import { is_collection_file, parse_collection_file } from '@server/component/collection_file';
import { replace_raw_string } from '@server/component/replace_raw_string';
import { replace_user_name } from '@server/component/replace_user_name';
import { Pull_options, Syncer_interface } from '@server/syncer/interface';
import { Character as Character_tavern } from '@server/tavern/character';
import { append_yaml_endline } from '@server/util/append_yaml_endline';
import { detect_extension } from '@server/util/detect_extension';
import { extract_file_content } from '@server/util/extract_file_content';
import { glob_file } from '@server/util/glob_file';
import { sanitize_filename } from '@server/util/sanitize_filename';
import { translate } from '@server/util/translate';
import { trim_yaml_endline } from '@server/util/trim_yaml_endline';
import { Character as Character_en } from '@type/character.en';
import {
  is_zh as character_is_zh,
  Character as Character_zh,
  zh_to_en_map as character_zh_to_en_map,
} from '@type/character.zh';
import { zh_to_en_map } from '@type/settings.zh';
import PNGtext from 'png-chunk-text';
import extract from 'png-chunks-extract';

import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import YAML from 'yaml';

export class Character_syncer extends Syncer_interface {
  constructor(config_name: string, name: string, file: string, bundle_file: string | undefined) {
    super(
      'character',
      _.invert(zh_to_en_map)['character'],
      config_name,
      name,
      file,
      bundle_file,
      Character_en,
      Character_zh,
      character_zh_to_en_map,
      character_is_zh,
      Character_tavern,
    );
  }

  protected do_check_safe(
    local_data: Character_en,
    tavern_data: Character_tavern,
  ): { local_only_data: string[]; tavern_only_data: string[] } {
    const local_names = local_data.entries.map(entry => entry.name);
    const tavern_names = tavern_data.entries.map(entry => entry.name);
    return {
      local_only_data: _.difference(local_names, tavern_names),
      tavern_only_data: _.difference(tavern_names, local_names),
    };
  }

  protected do_pull(
    local_data: Character_en | null,
    tavern_data: Character_tavern,
    { should_split }: Omit<Pull_options, 'should_force'>,
  ): {
    result_data: Record<string, any>;
    error_data: Record<string, any>;
    files: {
      name: string;
      path: string;
      content: string | Buffer;
    }[];
  } {
    // TODO: 知道很烂, 有时间重构
    let files: { name: string; path: string; content: string | Buffer }[] = [];

    // 头像
    {
      const local_file = local_data?.avatar;
      let file = local_file ?? '头像.png';
      file = _.get(_.invert(this.zh_to_en_map), file, file);

      let file_to_write = '';
      let file_to_set = '';

      const glob_files = glob_file(this.dir, file);
      if (glob_files.length === 0) {
        file_to_write = file.replace(/\.[^\\/.]+$|$/, '.png');
        file_to_set = file.replace(/\.[^\\/.]+$/, '');
      } else if (glob_files.length === 1) {
        file_to_write = glob_files[0];
        file_to_set = relative(this.dir, glob_files[0]).replace(/\.[^\\/.]+$/, '');
      } else {
        file_to_write = file;
        file_to_set = file;
      }

      const chunks = extract(new Uint8Array(tavern_data.avatar));
      const tEXtChunks = chunks.filter(chunk => chunk.name === 'tEXt');

      // Remove existing tEXt chunks
      for (const tEXtChunk of tEXtChunks) {
        const data = PNGtext.decode(tEXtChunk.data);
        if (data.keyword.toLowerCase() === 'chara' || data.keyword.toLowerCase() === 'ccv3') {
          chunks.splice(chunks.indexOf(tEXtChunk), 1);
        }
      }

      files.push({
        name: '!头像',
        path: file_to_write,
        content: Buffer.from(encode(chunks)),
      });
      _.set(tavern_data, 'avatar', file_to_set);
    }

    // 第一条消息
    {
      const states: { name: string; content?: string; file?: string }[] =
        local_data === null
          ? []
          : local_data.first_messages.map((entry, index) => ({ name: `第一条消息${index}`, ...entry }));

      tavern_data.first_messages.forEach((entry, index) => {
        _.set(entry, 'content', replace_user_name(entry.content ?? ''));

        const handle_file = (entry: Character_tavern['first_messages'][number], file: string) => {
          let file_to_write = '';
          let file_to_set = '';

          const glob_files = glob_file(this.dir, file);
          if (glob_files.length === 0) {
            file_to_write = file.replace(/\.[^\\/.]+$|$/, '.txt');
            file_to_set = file.replace(/\.[^\\/.]+$/, '');
          } else if (glob_files.length === 1) {
            file_to_write = glob_files[0];
            file_to_set = relative(this.dir, glob_files[0]).replace(/\.[^\\/.]+$/, '');
          } else {
            file_to_write = file;
            file_to_set = file;
          }

          files.push({
            name: `!第一条消息${index}`,
            path: file_to_write,
            content: entry.content,
          });
          _.unset(entry, 'content');
          _.set(entry, 'file', file_to_set);
        };

        const state = states.find(state => state.name === `第一条消息${index}`);
        if (state === undefined && should_split) {
          handle_file(entry, join('第一条消息', `${index}.txt`));
        } else if (state?.file !== undefined) {
          handle_file(entry, state.file);
        }
      });
    }

    // 世界书名称
    {
      if (tavern_data.worldbook === this.name) {
        _.set(tavern_data, 'worldbook', '与角色卡名称相同');
      }
    }

    // 条目
    {
      const states: { name: string; content?: string; file?: string }[] = local_data === null ? [] : local_data.entries;

      const local_names = states.map(entry => entry.name);
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

        const handle_file = (entry: Character_tavern['entries'][number], file: string) => {
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

        const state = states.find(state => state.name === entry.name);
        if (state === undefined && should_split) {
          handle_file(entry, join('世界书', sanitize_filename(entry.name) + detect_extension(entry.content)));
        } else if (state?.file !== undefined) {
          handle_file(entry, state.file);
        }
      });
    }

    return { result_data: tavern_data, error_data: {}, files };
  }

  protected do_beautify_config(tavern_data: Character_tavern, language: 'zh' | 'en'): string {
    const document = new YAML.Document(
      language === 'zh' ? translate(tavern_data, _.invert(this.zh_to_en_map)) : tavern_data,
    );
    [
      ['条目'],
      ['扩展字段', '正则'],
      ['扩展字段', '酒馆助手', '脚本库'],
      ['entries'],
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
      if (YAML.isPair(node) && (key as number) > 3 && (key as number) !== 8) {
        (node.key as YAML.Node).spaceBefore = true;
      }
      return YAML.visit.SKIP;
    });
    return document.toString({ blockQuote: 'literal' });
  }

  // TODO: 拆分 component
  protected do_push(local_data: Character_en): { result_data: Character_en; error_data: Record<string, any> } {
    // TODO: 知道很烂, 有时间重构
    let error_data = {
      未能找到以下外链头像文件: [] as string[],
      未能找到以下外链第一条消息文件: [] as string[],
      未能找到以下外链提示词文件: [] as string[],
      通过补全文件后缀找到了多个文件: [] as Record<string, string[]>[],
      未能从合集文件中找到以下条目: [] as string[],
    };

    // 头像
    {
      if (local_data.avatar) {
        const avatar = _.get(_.invert(this.zh_to_en_map), local_data.avatar, local_data.avatar);
        const paths = glob_file(this.dir, avatar);
        if (paths.length === 0) {
          error_data.未能找到以下外链头像文件.push(avatar);
        } else if (paths.length > 1) {
          error_data.通过补全文件后缀找到了多个文件.push({ 头像: paths });
        } else {
          const content = readFileSync(paths[0]);
          _.set(local_data, 'avatar', content);
        }
      }
    }

    // 第一条消息
    {
      local_data.first_messages.forEach((entry, index) => {
        if (entry.file === undefined) {
          return;
        }

        const paths = glob_file(this.dir, entry.file);
        if (paths.length === 0) {
          error_data.未能找到以下外链第一条消息文件.push(`第 '${index}' 第一条消息: '${entry.file}'`);
          return;
        }
        if (paths.length > 1) {
          error_data.通过补全文件后缀找到了多个文件.push({ [`第 '${index}' 第一条消息`]: paths });
          return;
        }
        const content = extract_file_content(paths[0]);
        _.set(entry, 'content', trim_yaml_endline(content));
        _.unset(entry, 'file');
      });
      local_data.first_messages.forEach(entry => {
        _.set(entry, 'content', replace_raw_string(replace_user_name(entry.content)));
      });
    }

    // 世界书名称
    {
      if (!local_data.worldbook || local_data.worldbook === '与角色卡名称相同') {
        _.set(local_data, 'worldbook', this.name);
      }
    }

    // 条目
    {
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
        let content = extract_file_content(paths[0]);
        if (is_collection_file(entry.file!)) {
          const collection_file = parse_collection_file(content);
          const collection_entry = collection_file.find(value => value.name === entry.name);
          if (collection_entry === undefined) {
            error_data.未能从合集文件中找到以下条目.push(`'${entry.file}': 第 '${index}' 条目 '${entry.name}'`);
            return;
          }
          content = collection_entry.content;
        }
        _.set(entry, 'content', trim_yaml_endline(content));
        _.unset(entry, 'file');
      });
      local_data.entries.forEach(entry => {
        _.set(entry, 'content', replace_raw_string(replace_user_name(entry.content)));
      });
    }

    return {
      result_data: local_data,
      error_data: _.pickBy(error_data, value => value.length > 0),
    };
  }

  protected do_watch(local_data: Character_en): string[] {
    return _(
      _(local_data.first_messages)
        .concat(local_data.entries)
        .filter(entry => entry.file !== undefined)
        .map(entry => resolve(this.dir, entry.file!))
        .value(),
    )
      .map(path => dirname(path))
      .concat(this.dir)
      .concat(this.file)
      .value();
  }

  protected do_bundle(local_data: Character_en): { result_data: Record<string, any>; error_data: Record<string, any> } {
    const { result_data, error_data } = this.do_push(local_data);
    // @ts-expect-error TODO: 修复类型
    return { result_data: bundle_character(this.name, result_data), error_data };
  }
}
