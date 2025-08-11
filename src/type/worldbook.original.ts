import * as z from 'zod';

export type Worldbook_entry = z.infer<typeof Worldbook_entry>;
export const Worldbook_entry = z.object({
  name: z.string(),
  uid: z.number(),
  enabled: z.boolean(),

  strategy: z.object({
    type: z.enum(['constant', 'selective', 'vectorized']),
    keys: z.array(z.string()),
    keys_secondary: z.object({
      logic: z.enum(['and_any', 'and_all', 'not_all', 'not_any']),
      keys: z.array(z.string()),
    }),
    scan_depth: z.union([z.literal('same_as_global'), z.number()]),
  }),

  position: z.object({
    type: z.enum([
      'before_character_definition',
      'after_character_definition',
      'before_example_messages',
      'after_example_messages',
      'before_author_note',
      'after_author_note',
      'at_depth',
    ]),
    role: z.enum(['system', 'assistant', 'user']),
    depth: z.number(),
    order: z.number(),
  }),

  probability: z.number().min(0).max(100),

  recursion: z.object({
    prevent_incoming: z.boolean(),
    prevent_outgoing: z.boolean(),
    delay_until: z.number().min(1).nullable(),
  }),

  effect: z
    .object({
      sticky: z.number().nullable(),
      cooldown: z.number().nullable(),
      delay: z.number().nullable(),
    })
    .partial(),

  extra: z.record(z.string(), z.any()).optional(),

  content: z.string(),
});

export type Worldbook = z.infer<typeof Worldbook>;
export const Worldbook = z.array(Worldbook_entry).min(1);
