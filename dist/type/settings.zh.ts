import * as z from 'zod';

export const zh_to_en_map = {
  user名称: 'user_name',
  配置: 'configs',
  类型: 'type',
  世界书: 'worldbook',
  预设: 'preset',
  酒馆中的名称: 'name',
  本地文件路径: 'file',
} as const;
export function is_zh(data: Record<string, any>): boolean {
  return _.has(data, '配置');
}

export type Config_type = z.infer<typeof Config_type>;
export const Config_type = z.enum(['世界书', '预设']);

export type Config = z.infer<typeof Config>;
export const Config = z.strictObject({
  类型: Config_type,
  酒馆中的名称: z
    .string()
    .describe('世界书/预设的配置文件要提取到本地哪个文件中, 可以是绝对路径或相对于本文件的相对路径'),
  本地文件路径: z
    .string()
    .transform(string => (string.endsWith('.yaml') ? string : string + '.yaml'))
    .describe('世界书/预设的配置文件要提取到本地哪个文件中, 可以是绝对路径或相对于本文件的相对路径'),
  导出文件路径: z
    .string()
    .optional()
    .transform(string => (string !== undefined && !string.endsWith('.json') ? string + '.json' : string))
    .describe(
      '当使用 `node tavern_sync.mjs push 配置名称 -e` 导出能直接由酒馆界面导入的世界书/预设文件时, 要将它存放在哪个文件中; 不填则默认导出到世界书/预设配置文的同目录下',
    ),
});

export type Settings = z.infer<typeof Settings>;
export const Settings = z.strictObject({
  user名称: z.string().regex(/^\S+$/).optional(),
  配置: z.record(z.string(), Config),
});
