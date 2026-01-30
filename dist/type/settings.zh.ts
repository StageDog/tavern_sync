import _ from 'lodash';
import { dirname, resolve } from 'path';
import * as z from 'zod';

export const zh_to_en_map = {
  user名称: 'user_name',
  配置: 'configs',
  类型: 'type',
  角色卡: 'character',
  世界书: 'worldbook',
  预设: 'preset',
  酒馆中的名称: 'name',
  本地文件路径: 'file',
  导出文件路径: 'bundle_file',
} as const;
export function is_zh(data: Record<string, any>): boolean {
  return _.has(data, '配置');
}

export type Config_type = z.infer<typeof Config_type>;
export const Config_type = z.enum(['角色卡', '世界书', '预设']);

export type Config = z.infer<typeof Config>;
export const Config = z.strictObject({
  类型: Config_type,
  酒馆中的名称: z
    .string()
    .describe('角色卡/世界书/预设的配置文件要提取到本地哪个文件中, 可以是绝对路径或相对于本文件的相对路径'),
  本地文件路径: z
    .string()
    .transform(string => (string.endsWith('.yaml') ? string : string + '.yaml'))
    .describe('角色卡/世界书/预设的配置文件要提取到本地哪个文件中, 可以是绝对路径或相对于本文件的相对路径'),
  导出文件路径: z
    .string()
    .optional()
    .describe(
      '当使用 `node tavern_sync.mjs bundle 配置名称` 打包角色卡/世界书/预设文件时, 要将它存放在哪个文件中; 不填则默认打包到角色卡/世界书/预设配置文件的同目录下',
    ),
});

export type Settings = z.infer<typeof Settings>;
export const Settings = z.strictObject({
  user名称: z.string().regex(/^\S+$/).optional(),
  配置: z.record(z.string(), Config).transform(data => {
    return _.mapValues(data, (value, key) => {
      if (value.导出文件路径 !== undefined) {
        switch (value.类型) {
          case '角色卡':
            value.导出文件路径 = resolve(
              __dirname,
              value.导出文件路径.endsWith('.png') ? value.导出文件路径 : value.导出文件路径 + '.png',
            );
            break;
          case '世界书':
          case '预设':
            value.导出文件路径 = resolve(
              __dirname,
              value.导出文件路径.endsWith('.json') ? value.导出文件路径 : value.导出文件路径 + '.json',
            );
            break;
        }
      } else {
        switch (value.类型) {
          case '角色卡':
            value.导出文件路径 = resolve(dirname(resolve(__dirname, value.本地文件路径)), `${key}.png`);
            break;
          case '世界书':
          case '预设':
            value.导出文件路径 = resolve(dirname(resolve(__dirname, value.本地文件路径)), `${key}.json`);
            break;
        }
      }
      return value;
    });
  }),
});
