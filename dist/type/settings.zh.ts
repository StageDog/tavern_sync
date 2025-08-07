import * as z from 'zod';

export type Config_type = z.infer<typeof Config_type>;
export const Config_type = z.enum(['世界书', '预设']);

export type Config = z.infer<typeof Config>;
export const Config = z.object({
  类型: Config_type,
  酒馆中的名称: z.string(),
  本地文件路径: z.string(),
});

export type Settings = z.infer<typeof Settings>;
export const Settings = z.object({
  user名称: z.string(),
  配置: z.record(
    z.string(),
    z.object({
      类型: Config_type,
      酒馆中的名称: z.string(),
      本地文件路径: z.string(),
    }),
  ),
});
