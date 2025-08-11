import { parse_regex_from_string } from '@server/util/parse_regex_from_string';

import dedent from 'dedent';
import * as z from 'zod';

type Worldbook_entry = z.infer<typeof Worldbook_entry>;
const Worldbook_entry = z.object({
  name: z.string(),
  uid: z.number().optional().describe('该条目的唯一标识符, 如果不设置或有重复则会自动分配一个新的'),
  enabled: z.boolean(),

  strategy: z
    .object({
      type: z.enum(['constant', 'selective', 'vectorized']).describe(
        dedent(`
          激活策略类型:
          - constant: 常量🔵, 俗称蓝灯. 只需要满足 "启用"、"激活概率%" 等别的要求即可.
          - selective: 可选项🟢, 俗称绿灯. 除了蓝灯条件, 还需要满足 \`keys\` 扫描条件
          - vectorized: 向量化🔗. 一般不使用
        `),
      ),
      keys: z
        .array(z.string().transform(string => parse_regex_from_string(string) ?? string))
        .min(1)
        .optional()
        .describe('关键字: 绿灯条目必须在欲扫描文本中扫描到其中任意一个关键字才能激活'),
      keys_secondary: z
        .object({
          logic: z.enum(['and_any', 'and_all', 'not_all', 'not_any']).describe(
            dedent(`
              次要关键字逻辑:
              - and_any: 次要关键字中任意一个关键字能在欲扫描文本中匹配到
              - and_all: 次要关键字中所有关键字都能在欲扫描文本中匹配到
              - not_all: 次要关键字中至少有一个关键字没能在欲扫描文本中匹配到
              - not_any: 次要关键字中所有关键字都没能欲扫描文本中匹配到
            `),
          ),
          keys: z.array(z.string().transform(string => parse_regex_from_string(string) ?? string)).min(1),
        })
        .optional()
        .describe(
          '次要关键字: 如果设置了次要关键字, 则条目除了在 `keys` 中匹配到任意一个关键字外, 还需要按次要关键字的 `logic` 满足次要关键字的 `keys`',
        ),
      scan_depth: z
        .union([z.literal('same_as_global'), z.number().min(1)])
        .optional()
        .describe('扫描深度: 1 为仅扫描最后一个楼层, 2 为扫描最后两个楼层, 以此类推'),
    })
    .superRefine((data, context) => {
      if (data.type === 'selective' && data.keys === undefined) {
        context.addIssue({
          code: 'custom',
          path: ['keys'],
          message: "当激活策略为绿灯 (`'selective'`) 时, `keys` 中有必须至少一个主要关键字",
        });
      }
    })
    .describe('激活策略: 条目应该何时激活'),

  position: z
    .object({
      type: z
        .enum([
          'before_character_definition',
          'after_character_definition',
          'before_example_messages',
          'after_example_messages',
          'before_author_note',
          'after_author_note',
          'at_depth',
        ])
        .describe(
          dedent(`
            插入位置类型:
            - before_character_definition: 角色定义之前
            - after_character_definition: 角色定义之后
            - before_example_messages: 示例消息之前
            - after_example_messages: 示例消息之后
            - before_author_note: 作者注释之前
            - after_author_note: 作者注释之后
            - at_depth: 插入到指定深度
          `),
        ),
      role: z
        .enum(['system', 'assistant', 'user'])
        .optional()
        .describe("该条目的消息身份, 仅位置类型为 `'at_depth'` 时有效"),
      depth: z.number().optional().describe("该条目要插入的深度, 仅位置类型为 `'at_depth'` 时有效"),
      order: z.number(),
    })
    .describe('插入位置: 如果条目激活应该插入到什么地方')
    .superRefine((data, context) => {
      if (data.type === 'at_depth') {
        if (data.role === undefined) {
          context.addIssue({
            code: 'custom',
            path: ['role'],
            message: "当插入位置 (`position`) 为 `'at_depth'` 时, 必须填写 `role`",
          });
        }
        if (data.depth === undefined) {
          context.addIssue({
            code: 'custom',
            path: ['depth'],
            message: "当插入位置 (`position`)为 `'at_depth'` 时, 必须填写 `depth`",
          });
        }
      } else {
        if (data.role !== undefined) {
          context.addIssue({
            code: 'custom',
            path: ['role'],
            message: "当插入位置 (`position`) 不为 `'at_depth'` 时, `role` 不起作用, 不要填写",
          });
        }
        if (data.depth !== undefined) {
          context.addIssue({
            code: 'custom',
            path: ['depth'],
            message: "当插入位置 (`position`) 不为 `'at_depth'` 时, `depth` 不起作用, 不要填写",
          });
        }
      }
    }),

  probability: z.number().min(0).max(100).optional(),

  recursion: z
    .object({
      prevent_incoming: z.boolean().describe('禁止其他条目递归激活本条目'),
      prevent_outgoing: z.boolean().describe('禁止本条目递归激活其他条目'),
      delay_until: z.number().min(1).nullable().describe('延迟到第 n 级递归检查时才能激活本条目'),
    })
    .partial()
    .optional()
    .describe('递归表示某世界书条目被激活后, 该条目的提示词又激活了其他条目'),

  effect: z
    .object({
      sticky: z
        .number()
        .min(1)
        .nullable()
        .describe('黏性: 条目激活后, 在之后 n 条消息内始终激活, 无视激活策略、激活概率%'),
      cooldown: z.number().min(1).nullable().describe('冷却: 条目激活后, 在之后 n 条消息内不能再激活'),
      delay: z.number().min(1).nullable().describe('延迟: 聊天中至少有 n 楼消息时, 才能激活条目'),
    })
    .partial()
    .optional(),

  extra: z.record(z.string(), z.any()).optional().describe('额外字段: 用于为预设提示词绑定额外数据'),

  content: z.string(),
});

export type Worldbook = z.infer<typeof Worldbook>;
export const Worldbook = z.object({ entries: z.array(Worldbook_entry).min(1) });
