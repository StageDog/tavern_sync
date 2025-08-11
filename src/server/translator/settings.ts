import { translate } from '@server/util/translate';
import { Settings as Settings_en } from '@type/settings.en';
import { Settings as Settings_zh } from '@type/settings.zh';

const to_zh_map = {
  user_name: 'user名称',
  configs: '配置',
  type: '类型',
  worldbook: '世界书',
  preset: '预设',
  name: '酒馆中的名称',
  path: '本地文件路径',
} as const;

export function to_zh(settings: Settings_en, { should_check = true } = {}): Settings_zh {
  const result = translate(settings, to_zh_map);
  return should_check ? Settings_zh.parse(result) : (result as Settings_zh);
}

export function from_zh(settings: Settings_zh, { should_check = true } = {}): Settings_en {
  const result = translate(settings, _.invert(to_zh_map));
  return should_check ? Settings_en.parse(result) : (result as Settings_en);
}
