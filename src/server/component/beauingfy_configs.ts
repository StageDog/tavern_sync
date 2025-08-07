import { get_settings } from '@/settings';
import { to_zh } from '@/translator/settings';

export function beauingfy_configs(): string {
  return `
可用的条目有:
${Object.entries(to_zh(get_settings()).配置)
  .map(([name, value]) => `- (${value.类型}) ${name}`)
  .join('\n')}`;
}
