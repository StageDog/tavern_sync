import * as z from 'zod';

export const zh_to_en_map = {} as const;
export function is_zh(data: Record<string, any>): boolean {
  return _.has(data, '条目');
}

// TODO:
type Worldbook_entry = z.infer<typeof Worldbook_entry>;
const Worldbook_entry = z.object({});

export type Worldbook = z.infer<typeof Worldbook>;
export const Worldbook = z.object({ 条目: z.array(Worldbook_entry).min(1) });
