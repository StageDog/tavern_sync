import { extract_file_content } from '@server/component/extract_file_content';
import { Syncer_interface } from '@server/syncer/interface';
import { Worldbook as Worldbook_tavern } from '@server/tavern/worldbook';
import { Worldbook as Worldbook_en } from '@type/worldbook.en';
import {
  Worldbook as Worldbook_zh,
  is_zh as worldbook_is_zh,
  zh_to_en_map as worldbook_zh_to_en_map,
} from '@type/worldbook.zh';

export interface Pull_options {
  language: 'zh' | 'en';
}

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

  protected do_push(local_data: Worldbook_en): { result_data: Record<string, any>; error_data: Record<string, any> } {
    let errors: string[] = [];

    local_data.entries.forEach((entry, index) => {
      if (entry.file === undefined) {
        return;
      }

      const content = extract_file_content(this.file, entry.file!);
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
}
