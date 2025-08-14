import { Syncer_interface } from '@server/syncer/interface';
import { Preset as Preset_tavern } from '@server/tavern/preset';
import { Preset as Preset_en, prompt_placeholder_ids } from '@type/preset.en';
import { Preset as Preset_zh, is_zh as preset_is_zh, zh_to_en_map as preset_zh_to_en_map } from '@type/preset.zh';

export interface Pull_options {
  language: 'zh' | 'en';
}

export class Preset_syncer extends Syncer_interface {
  constructor(type: string, type_zh: string, name: string, path: string) {
    super(type, type_zh, name, path, Preset_en, Preset_zh, preset_zh_to_en_map, preset_is_zh, Preset_tavern);
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
}
