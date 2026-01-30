import _ from 'lodash';
import { dirname, resolve } from 'path';
import * as z from 'zod';

type Config_type = z.infer<typeof Config_type>;
const Config_type = z.enum(['character', 'worldbook', 'preset']);

export type Config = z.infer<typeof Config>;
export const Config = z.strictObject({
  type: Config_type,
  name: z.string().describe('角色卡/世界书/预设在酒馆中的名称'),
  file: z
    .string()
    .transform(string => (string.endsWith('.yaml') ? string : string + '.yaml'))
    .describe('角色卡/世界书/预设的配置文件要提取到本地哪个文件中, 可以是绝对路径或相对于本文件的相对路径'),
  bundle_file: z
    .string()
    .optional()
    .describe(
      '当使用 `node tavern_sync.mjs bundle 配置名称` 打包角色卡/世界书/预设文件时, 要将它存放在哪个文件中; 不填则默认打包到角色卡/世界书/预设配置文件的同目录下',
    ),
});
export type Settings = z.infer<typeof Settings>;
export const Settings = z.strictObject({
  user_name: z.string().regex(/^\S+$/).optional(),
  configs: z.record(z.string(), Config).transform(data => {
    return _.mapValues(data, (value, key) => {
      if (value.bundle_file !== undefined) {
        switch (value.type) {
          case 'character':
            value.bundle_file = value.bundle_file.endsWith('.png') ? value.bundle_file : value.bundle_file + '.png';
            break;
          case 'worldbook':
          case 'preset':
            value.bundle_file = value.bundle_file.endsWith('.json') ? value.bundle_file : value.bundle_file + '.json';
            break;
        }
      } else {
        switch (value.type) {
          case 'character':
            value.bundle_file = resolve(dirname(resolve(__dirname, value.file)), `${key}.png`);
            break;
          case 'worldbook':
          case 'preset':
            value.bundle_file = resolve(dirname(resolve(__dirname, value.file)), `${key}.json`);
            break;
        }
      }
      return value;
    });
  }),
});
