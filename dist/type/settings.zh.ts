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
export const Config = z.object({
  类型: Config_type,
  酒馆中的名称: z.string(),
  本地文件路径: z.string().regex(/^(?:(?:[a-zA-Z]:|\.|\.\.)?([\\/][^\\/]+)*|[^\\/]+)\.yaml$/),
});

export type Settings = z.infer<typeof Settings>;
export const Settings = z.object({
  user名称: z.string().regex(/^\S+$/),
  配置: z.record(z.string(), Config),
});
