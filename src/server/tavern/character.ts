import { Extensions } from '@server/tavern/extensions';
import { Worldbook_entry } from '@server/tavern/worldbook';
import * as z from 'zod';

export type Character = z.infer<typeof Character>;
export const Character = z.strictObject({
  avatar: z.instanceof(Buffer),
  version: z.string(),
  creator: z.string(),
  creator_notes: z.string(),

  first_messages: z.array(z.string().transform(message => ({ content: message }))).prefault(['']),

  description: z.string().default(''),
  anchors: z.record(z.string(), z.any()).prefault({}),
  worldbook: z.string(),
  entries: z.array(Worldbook_entry).prefault([]),

  extensions: Extensions.optional().describe('扩展字段: 用于为预设绑定额外数据'),
});
