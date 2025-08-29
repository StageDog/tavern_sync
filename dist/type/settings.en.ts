import * as z from 'zod';

type Config_type = z.infer<typeof Config_type>;
const Config_type = z.enum(['worldbook', 'preset']);

export type Config = z.infer<typeof Config>;
export const Config = z.strictObject({
  type: Config_type,
  name: z.string(),
  file: z
    .string()
    .regex(/^(?:(?:[a-zA-Z]:|\.|\.\.)?([\\/][^\\/]+)*|[^\\/]+)$/)
    .transform(string => (string.endsWith('.yaml') ? string : string + '.yaml')),
});

export type Settings = z.infer<typeof Settings>;
export const Settings = z.strictObject({
  user_name: z.string().regex(/^\S+$/),
  configs: z.record(z.string(), Config),
});
