import { translate } from '@server/util/translate';
import { write_file_recursively } from '@server/util/write_file_recursively';
import { Settings as Settings_en } from '@type/settings.en';
import { Settings as Settings_zh, is_zh, zh_to_en_map } from '@type/settings.zh';
import default_settings_content from '@server/settings_default.yaml?raw';

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { exit } from 'node:process';
import YAML from 'yaml';

let settings: Settings_en | null = null;
export function get_settings(): Settings_en {
  if (!settings) {
    const config_file = join(__dirname, 'tavern_sync.yaml');
    if (!existsSync(config_file)) {
      write_file_recursively(config_file, default_settings_content);
      console.error(`配置文件不存在，已自动生成在 ${config_file}，请填写配置文件后重新运行`);
      exit(1);
    }
    const data = YAML.parse(readFileSync(config_file, 'utf8'));
    if (is_zh(data)) {
      settings = translate(Settings_zh.parse(data), zh_to_en_map) as Settings_en;
    } else {
      settings = Settings_en.parse(data);
    }
  }
  return settings!;
}
