import { Syncer_interface } from '@/syncer/interface';
import { Lorebook_syncer } from '@/syncer/lorebook';
import { Preset_syncer } from '@/syncer/preset';
import { Config } from '@type/settings.en';

export function create_syncer(config: Config): Syncer_interface {
  if (config.type === 'lorebook') {
    return new Lorebook_syncer(config.name, config.path);
  }
  return new Preset_syncer(config.name, config.path);
}
