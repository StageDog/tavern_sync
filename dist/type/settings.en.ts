import * as z from 'zod';

type Config_type = z.infer<typeof Config_type>;
const Config_type = z.enum(['worldbook', 'preset']);

export type Config = z.infer<typeof Config>;
export const Config = z.strictObject({
  type: Config_type,
  name: z.string().describe('世界书/预设在酒馆中的名称'),
  file: z
    .string()
    .regex(/^(?:(?:[a-zA-Z]:|\.|\.\.)?([\\/][^\\/]+)*|[^\\/]+)$/)
    .transform(string => (string.endsWith('.yaml') ? string : string + '.yaml'))
    .describe('世界书/预设的配置文件要提取到本地哪个文件中, 可以是绝对路径或相对于本文件的相对路径'),
  export_file: z
    .string()
    .optional()
    .transform(string => (string !== undefined && !string.endsWith('.json') ? string + '.json' : string))
    .describe(
      '当使用 `node tavern_sync.mjs push 配置名称 -e` 导出能直接由酒馆界面导入的世界书/预设文件时, 要将它存放在哪个文件中; 不填则默认导出到世界书/预设配置文件的同目录下',
    ),
});
export type Settings = z.infer<typeof Settings>;
export const Settings = z.strictObject({
  user_name: z.string().regex(/^\S+$/),
  configs: z.record(z.string(), Config),
});
