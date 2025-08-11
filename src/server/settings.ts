import { Settings as Settings_en } from '@type/settings.en';
import { zh_to_en_map } from '@type/settings.zh';

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { exit } from 'node:process';
import YAML from 'yaml';
import { translate } from './util/translate';
import { write_file_recursively } from './util/write_file_recursively';

const default_settings: Settings_en = {
  user_name: '在此填入user名称, 提示词中如果有这个名字则会被替换成<user>',
  configs: {
    '在此填写配置名称，下面是一些具体例子可以删掉': {
      type: 'worldbook',
      name: '在此填写酒馆中的世界书名称',
      path: '在此填写你要把世界书提取到本地哪个文件里，如: 世界书.yaml',
    },
    恩赐之主: {
      type: 'worldbook',
      name: '恩赐之主',
      path: './世界书/恩赐之主.yaml',
    },
    三个女孩各有秘密: {
      type: 'worldbook',
      name: '-三个女孩各有秘密',
      path: 'C:\\三个女孩各有秘密\\世界书\\三个女孩各有秘密.yaml',
    },
    在此填写配置名称2: {
      type: 'worldbook',
      name: '在此填写酒馆中的预设名称',
      path: '在此填写你要把预设提取到本地哪个文件里，如: 预设.yaml',
    },
    猴子打字机: {
      type: 'preset',
      name: '猴子打字机',
      path: '猴子打字机.yaml',
    },
  },
};

function beautingfy_settings(settings: Settings_en, language: 'zh' | 'en'): string {
  const schema_url = `https://testingcf.jsdelivr.net/gh/StageDog/tavern_sync/dist/schema/settings.${language}.json`;
  let result = `# yaml-language-server: $schema=${schema_url}\n`;
  result += YAML.stringify(language === 'en' ? settings : translate(settings, _.invert(zh_to_en_map)));
  return result;
}

let settings: Settings_en | null = null;
export function get_settings(): Settings_en {
  if (!settings) {
    const config_path = join(__dirname, 'tavern_sync.yaml');
    if (!existsSync(config_path)) {
      // TODO: 询问 zh or en
      write_file_recursively(config_path, beautingfy_settings(default_settings, 'zh'));
      console.error(`配置文件不存在，已自动生成在 ${config_path}，请填写配置文件后重新运行`);
      exit(1);
    }
    // TODO: en 配置文件
    settings = Settings_en.parse(translate(YAML.parse(readFileSync(config_path, 'utf8')), zh_to_en_map));
  }
  return settings!;
}
