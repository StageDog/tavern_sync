import * as z from 'zod';

export type Lorebook_entry = z.infer<typeof Lorebook_entry>;
export const Lorebook_entry = z.object({
  uid: z.number().describe('uid 是相对于世界书内部的, 不要跨世界书使用'),
  display_index: z.number().describe('酒馆中将排序设置为 "自定义" 时的显示顺序'),

  comment: z.string(),
  enabled: z.boolean(),
  type: z.enum(['constant', 'selective', 'vectorized']),
  position: z.enum([
    'before_character_definition',
    'after_character_definition',
    'before_example_messages',
    'after_example_messages',
    'before_author_note',
    'after_author_note',
    'at_depth_as_system',
    'at_depth_as_assistant',
    'at_depth_as_user',
  ]),

  /** 仅对于 `position === 'at_depth_as_???'` 有意义; 其他情况为 null */
  depth: z.number().nullable(),
  order: z.number(),
  probability: z.number(),

  keys: z.array(z.string()),
  logic: z.enum(['and_any', 'and_all', 'not_all', 'not_any']),
  filters: z.array(z.string()),

  scan_depth: z.union([z.literal('same_as_global'), z.number()]),
  case_sensitive: z.union([z.literal('same_as_global'), z.boolean()]),
  match_whole_words: z.union([z.literal('same_as_global'), z.boolean()]),
  use_group_scoring: z.union([z.literal('same_as_global'), z.boolean()]),
  automation_id: z.string().nullable(),

  exclude_recursion: z.boolean(),
  prevent_recursion: z.boolean(),
  /** 启用则是 true, 如果设置了具体的 Recursion Level 则是数字 (具体参考酒馆中勾选这个选项后的变化) */
  delay_until_recursion: z.union([z.boolean(), z.number()]),

  content: z.string(),

  group: z.string(),
  group_prioritized: z.boolean(),
  group_weight: z.number(),
  sticky: z.number().nullable(),
  cooldown: z.number().nullable(),
  delay: z.number().nullable(),
});

export type Lorebook = z.infer<typeof Lorebook>;
export const Lorebook = z.array(Lorebook_entry).min(1);
