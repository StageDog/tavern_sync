import * as z from 'zod';

export const zh_to_en_map = {} as const;
export function is_zh(data: Record<string, any>): boolean {
  return _.has(data, '条目');
}

// TODO:
export type Preset = z.infer<typeof Preset>;
export const Preset = z.object({});
