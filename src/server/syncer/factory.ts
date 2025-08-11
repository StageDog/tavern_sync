import { Syncer_interface } from '@server/syncer/interface';
import { Preset_syncer } from '@server/syncer/preset';
import { Worldbook_syncer } from '@server/syncer/worldbook';
import { Config } from '@type/settings.en';
import { zh_to_en_map } from '@type/settings.zh';

export function create_syncer(config: Config): Syncer_interface {
  if (config.type === 'worldbook') {
    return new Worldbook_syncer(config.type, _.invert(zh_to_en_map)[config.type], config.name, config.path);
  }
  return new Preset_syncer(config.type, _.invert(zh_to_en_map)[config.type], config.name, config.path);
}
