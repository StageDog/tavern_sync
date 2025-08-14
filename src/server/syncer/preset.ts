import { extract_file_content } from '@server/component/extract_file_content';
import { Syncer_interface } from '@server/syncer/interface';
import { Preset as Preset_tavern } from '@server/tavern/preset';
import { Preset as Preset_en, prompt_placeholder_ids } from '@type/preset.en';
import { Preset as Preset_zh, is_zh as preset_is_zh, zh_to_en_map as preset_zh_to_en_map } from '@type/preset.zh';

export interface Pull_options {
  language: 'zh' | 'en';
}

export class Preset_syncer extends Syncer_interface {
  constructor(type: string, type_zh: string, name: string, file: string) {
    super(type, type_zh, name, file, Preset_en, Preset_zh, preset_zh_to_en_map, preset_is_zh, Preset_tavern);
  }

  protected do_check_safe(
    local_data: Preset_en,
    tavern_data: Preset_tavern,
  ): { local_only_data: string[]; tavern_only_data: string[] } {
    const get_names = (data: Record<string, any>) => {
      return _(data.prompts)
        .concat(data.prompts_unused)
        .filter(prompt => !_.includes(prompt_placeholder_ids, prompt.id))
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

  protected do_push(local_data: Preset_en): { result_data: Record<string, any>; error_data: Record<string, any> } {
    let errors: string[] = [];

    const handle_file = (prompts: Preset_en['prompts'], source: string) => {
      prompts.forEach((prompt, index) => {
        if (!_.has(prompt, 'file') || prompt.file === undefined) {
          return;
        }

        const content = extract_file_content(this.file, prompt.file);
        if (content === null) {
          errors.push(`${source}条目 '${index}' 的 '${prompt.file}'`);
        } else {
          _.set(prompt, 'content', content);
          _.unset(prompt, 'file');
        }
      });
    };
    handle_file(local_data.prompts, '提示词');
    handle_file(local_data.prompts_unused, '未添加的提示词');

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
