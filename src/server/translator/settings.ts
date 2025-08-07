import { translate } from '@/util/translate';
import { Settings as Settings_en } from '@type/settings.en';
import { Settings as Settings_zh } from '@type/settings.zh';

const to_zh_map = {
  user_name: 'user名称',
  configs: '配置',
  type: '类型',
  lorebook: '世界书',
  preset: '预设',
  name: '酒馆中的名称',
  path: '本地文件路径',
} as const;

export function to_zh(settings: Settings_en): Settings_zh {
  return Settings_zh.parse(translate(settings, to_zh_map));
}

export function from_zh(settings: Settings_zh): Settings_en {
  return Settings_en.parse(translate(settings, _.invert(to_zh_map)));
}
