import { get_settings } from '@server/settings';
import { zh_to_en_map } from '@type/settings.zh';

export function beauingfy_configs(): string {
  return `可用的配置有: (使用 'all' 或 '所有' 来选择所有配置)
${Object.entries(get_settings().configs)
  .map(([name, value]) => `- (${_.invert(zh_to_en_map)[value.type]}) ${name}`)
  .join('\n')}`;
}
