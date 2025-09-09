import default_settings_content from '@server/settings_default.yaml?raw';
import { prettified_parse } from '@server/util/prettified_parse';
import { translate } from '@server/util/translate';
import { write_file_recursively } from '@server/util/write_file_recursively';
import { Settings as Settings_en } from '@type/settings.en';
import { Settings as Settings_zh, is_zh, zh_to_en_map } from '@type/settings.zh';

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { exit } from 'node:process';
import YAML from 'yaml';

let settings: Settings_en | null = null;
export function get_settings(): Settings_en {
  if (!settings) {
    const config_file = resolve(__dirname, 'tavern_sync.yaml');
    if (!existsSync(config_file)) {
      write_file_recursively(__dirname, config_file, default_settings_content);
      console.error(`配置文件不存在，已自动生成在 '${config_file}'，请填写配置文件后重新运行`);
      exit(1);
    }
    const data = YAML.parse(readFileSync(config_file, 'utf8'));
    settings = is_zh(data)
      ? (translate(prettified_parse(Settings_zh, data), zh_to_en_map) as Settings_en)
      : prettified_parse(Settings_en, data);
  }
  return settings!;
}
