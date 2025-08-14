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
  constructor(type: string, type_zh: string, name: string, path: string) {
    super(
      type,
      type_zh,
      name,
      path,
      Worldbook_en,
      Worldbook_zh,
      worldbook_zh_to_en_map,
      worldbook_is_zh,
      Worldbook_tavern,
    );
  }

  protected check_safe(
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
}
