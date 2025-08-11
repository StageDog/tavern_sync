import { translate } from '@server/util/translate';
import { Worldbook as Worldbook_en } from '@type/worldbook.en';
import { Worldbook as Worldbook_zh } from '@type/worldbook.zh';

const to_zh_map = {
  user_name: 'user名称',
  configs: '配置',
  type: '类型',
  worldbook: '世界书',
  preset: '预设',
  name: '酒馆中的名称',
  path: '本地文件路径',
} as const;

export function to_zh(worldbook: Worldbook_en, { should_check = true } = {}): Worldbook_zh {
  const result = translate(worldbook, to_zh_map);
  return should_check ? Worldbook_zh.parse(result) : (result as Worldbook_zh);
}

export function from_zh(worldbook: Worldbook_zh, { should_check = true } = {}): Worldbook_en {
  const result = translate(worldbook, _.invert(to_zh_map));
  return should_check ? Worldbook_en.parse(result) : (result as Worldbook_en);
}
