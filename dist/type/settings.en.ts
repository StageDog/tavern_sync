import * as z from 'zod';

type Config_type = z.infer<typeof Config_type>;
const Config_type = z.enum(['worldbook', 'preset']);

export type Config = z.infer<typeof Config>;
export const Config = z.object({
  type: Config_type,
  name: z.string(),
  path: z.string().endsWith('.yaml'),
});

export type Settings = z.infer<typeof Settings>;
export const Settings = z.object({
  user_name: z.string(),
  configs: z.record(z.string(), Config),
});
