import { Character_syncer } from '@server/syncer/character';
import { Syncer_interface } from '@server/syncer/interface';
import { Preset_syncer } from '@server/syncer/preset';
import { Worldbook_syncer } from '@server/syncer/worldbook';
import { Config } from '@type/settings.en';

export function create_syncer(config_name: string, config: Config): Syncer_interface {
  if (config.type === 'character') {
    return new Character_syncer(config_name, config.name, config.file, config.bundle_file);
  }
  if (config.type === 'worldbook') {
    return new Worldbook_syncer(config_name, config.name, config.file, config.bundle_file);
  }
  return new Preset_syncer(config_name, config.name, config.file, config.bundle_file);
}
