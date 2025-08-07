import { from_zh } from '@/translator/settings';
import { Settings } from '@type/settings.en';

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { exit } from 'node:process';
import YAML from 'yaml';

const default_settings = {
  user名称: '在此填入user名称, 提示词中如果有这个名字则会被替换成<user>',
  配置: {
    '在此填写配置名称，下面是一些具体例子可以删掉': {
      类型: '世界书',
      酒馆中的名称: '在此填写酒馆中的世界书名称',
      本地文件路径: '在此填写你要把世界书提取到本地哪个文件里，如: 世界书.yaml',
    },
    恩赐之主: {
      类型: '世界书',
      酒馆中的名称: '恩赐之主',
      本地文件路径: './世界书/恩赐之主.yaml',
    },
    三个女孩各有秘密: {
      类型: '世界书',
      酒馆中的名称: '-三个女孩各有秘密',
      本地文件路径: 'C:\\三个女孩各有秘密\\世界书\\三个女孩各有秘密.yaml',
    },
    在此填写配置名称2: {
      类型: '预设',
      酒馆中的名称: '在此填写酒馆中的预设名称',
      本地文件路径: '在此填写你要把预设提取到本地哪个文件里，如: 预设.yaml',
    },
    猴子打字机: {
      类型: '预设',
      酒馆中的名称: '猴子打字机',
      本地文件路径: '猴子打字机.yaml',
    },
  },
};

let settings: Settings | null = null;
export function get_settings(): Settings {
  if (!settings) {
    const config_path = join(__dirname, 'tavern_sync.yaml');
    if (!existsSync(config_path)) {
      // TODO: 询问 zh or en
      const schema_url =
        'https://testingcf.jsdelivr.net/gh/StageDog/tavern_sync/dist/schema/settings.zh.json';
      let result = `# yaml-language-server: $schema=${schema_url}\n`;
      result += YAML.stringify(default_settings);
      writeFileSync(config_path, result);

      console.error(`配置文件不存在，已自动生成在 ${config_path}，请填写配置文件后重新运行`);
      exit(1);
    }
    settings = from_zh(YAML.parse(readFileSync(config_path, 'utf8')));
  }
  return settings!;
}
