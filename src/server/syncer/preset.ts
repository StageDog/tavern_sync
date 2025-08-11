import { Syncer_interface } from '@server/syncer/interface';
import { Preset as Preset_tavern } from '@server/tavern/preset';
import { Preset as Preset_en } from '@type/preset.en';
import { Preset as Preset_zh, is_zh as preset_is_zh, zh_to_en_map as preset_zh_to_en_map } from '@type/preset.zh';

export interface Pull_options {
  language: 'zh' | 'en';
}

export class Preset_syncer extends Syncer_interface {
  constructor(type: string, type_zh: string,name: string, path: string) {
    super(type, type_zh, name, path, Preset_en, Preset_zh, preset_zh_to_en_map, preset_is_zh, Preset_tavern);
  }
}
