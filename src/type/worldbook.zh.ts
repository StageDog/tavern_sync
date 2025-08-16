import dedent from 'dedent';
import * as z from 'zod';

export const zh_to_en_map = {
  条目: 'entries',

  名称: 'name',
  启用: 'enabled',

  激活策略: 'strategy',
  类型: 'type',
  蓝灯: 'constant',
  绿灯: 'selective',
  向量化: 'vectorized',
  关键字: 'keys',
  次要关键字: 'keys_secondary',
  逻辑: 'logic',
  与任意: 'and_any',
  与所有: 'and_all',
  非所有: 'not_all',
  非任意: 'not_any',
  扫描深度: 'scan_depth',
  与全局设置相同: 'same_as_global',

  插入位置: 'position',
  角色定义之前: 'before_character_definition',
  角色定义之后: 'after_character_definition',
  示例消息之前: 'before_example_messages',
  示例消息之后: 'after_example_messages',
  作者注释之前: 'before_author_note',
  作者注释之后: 'after_author_note',
  指定深度: 'at_depth',
  角色: 'role',
  系统: 'system',
  AI: 'assistant',
  用户: 'user',
  深度: 'depth',
  顺序: 'order',

  激活概率: 'probability',

  递归: 'recursion',
  不可被其他条目激活: 'prevent_incoming',
  不可激活其他条目: 'prevent_outgoing',
  延迟递归: 'delay_until',

  特殊效果: 'effect',
  黏性: 'sticky',
  冷却: 'cooldown',
  延迟: 'delay',

  额外字段: 'extra',

  内容: 'content',
  文件: 'file',
} as const;
export function is_zh(data: Record<string, any>): boolean {
  return _.has(data, '条目');
}

type Worldbook_entry = z.infer<typeof Worldbook_entry>;
const Worldbook_entry = z
  .object({
    名称: z.string(),
    uid: z.number().optional().describe('该条目的唯一标识符, 如果不设置或有重复则会自动分配一个新的'),
    启用: z.boolean(),

    激活策略: z
      .object({
        类型: z.enum(['蓝灯', '绿灯', '向量化']).describe(
          dedent(`
          激活策略类型:
          - 蓝灯: 常量🔵 (constant). 只需要满足 "启用"、"激活概率%" 等别的要求即可.
          - 绿灯: 可选项🟢 (selective). 除了蓝灯条件, 还需要满足 \`关键字\` 扫描条件
          - 向量化: 向量化🔗 (vectorized). 一般不使用
        `),
        ),
        关键字: z
          .array(z.string())
          .min(1)
          .optional()
          .describe('关键字: 绿灯条目必须在欲扫描文本中扫描到其中任意一个关键字才能激活'),
        次要关键字: z
          .object({
            逻辑: z.enum(['与任意', '与所有', '非所有', '非任意']).describe(
              dedent(`
              次要关键字逻辑:
              - 与任意 (and_any): 次要关键字中任意一个关键字能在欲扫描文本中匹配到
              - 与所有 (and_all): 次要关键字中所有关键字都能在欲扫描文本中匹配到
              - 非所有 (not_all): 次要关键字中至少有一个关键字没能在欲扫描文本中匹配到
              - 非任意 (not_any): 次要关键字中所有关键字都没能欲扫描文本中匹配到
            `),
            ),
            关键字: z.array(z.string()).min(1),
          })
          .optional()
          .describe(
            '次要关键字: 如果设置了次要关键字, 则条目除了在`关键字`中匹配到任意一个关键字外, 还需要按次要关键字的`逻辑`满足次要关键字的`关键字`',
          ),
        扫描深度: z
          .union([z.literal('与全局设置相同'), z.number().min(1)])
          .optional()
          .describe('扫描深度: 1 为仅扫描最后一个楼层, 2 为扫描最后两个楼层, 以此类推'),
      })
      .superRefine((data, context) => {
        if (data.类型 === '绿灯' && data.关键字 === undefined) {
          context.addIssue({
            code: 'custom',
            path: ['关键字'],
            message: '当激活策略为`绿灯`时, `关键字`中有必须至少一个主要关键字',
          });
        }
      })
      .describe('激活策略: 条目应该何时激活'),

    插入位置: z
      .object({
        类型: z.enum([
          '角色定义之前',
          '角色定义之后',
          '示例消息之前',
          '示例消息之后',
          '作者注释之前',
          '作者注释之后',
          '指定深度',
        ]),
        角色: z.enum(['系统', 'AI', '用户']).optional().describe("该条目的消息身份, 仅位置类型为`'指定深度'`时有效"),
        深度: z.number().optional().describe("该条目要插入的深度, 仅位置类型为`'指定深度'`时有效"),
        顺序: z.number(),
      })
      .describe('插入位置: 如果条目激活应该插入到什么地方')
      .superRefine((data, context) => {
        if (data.类型 === '指定深度') {
          if (data.角色 === undefined) {
            context.addIssue({
              code: 'custom',
              path: ['角色'],
              message: "当`插入位置`为`'指定深度'`时, 必须填写`角色`",
            });
          }
          if (data.深度 === undefined) {
            context.addIssue({
              code: 'custom',
              path: ['深度'],
              message: "当`插入位置`为`'指定深度'`时, 必须填写`深度`",
            });
          }
        } else {
          if (data.角色 !== undefined) {
            context.addIssue({
              code: 'custom',
              path: ['角色'],
              message: "当`插入位置`不为`'指定深度'`时, `角色`不起作用, 不要填写",
            });
          }
          if (data.深度 !== undefined) {
            context.addIssue({
              code: 'custom',
              path: ['深度'],
              message: "当`插入位置`不为`'指定深度'`时, `深度`不起作用, 不要填写",
            });
          }
        }
      }),

    激活概率: z.number().min(0).max(100).optional(),

    递归: z
      .object({
        不可被其他条目激活: z.boolean().describe('禁止其他条目递归激活本条目'),
        不可激活其他条目: z.boolean().describe('禁止本条目递归激活其他条目'),
        延迟递归: z.number().min(1).nullable().describe('延迟到第 n 级递归检查时才能激活本条目'),
      })
      .partial()
      .optional()
      .describe('递归表示某世界书条目被激活后, 该条目的提示词又激活了其他条目'),

    特殊效果: z
      .object({
        黏性: z
          .number()
          .min(1)
          .nullable()
          .describe('黏性: 条目激活后, 在之后 n 条消息内始终激活, 无视激活策略、激活概率%'),
        冷却: z.number().min(1).nullable().describe('冷却: 条目激活后, 在之后 n 条消息内不能再激活'),
        延迟: z.number().min(1).nullable().describe('延迟: 聊天中至少有 n 楼消息时, 才能激活条目'),
      })
      .partial()
      .optional(),

    额外字段: z.record(z.string(), z.any()).optional().describe('额外字段: 用于为预设提示词绑定额外数据'),

    内容: z.string().optional().describe('内嵌的提示词内容'),
    文件: z.string().optional().describe('外链的提示词文件路径'),
  })
  .superRefine((data, context) => {
    if (data.内容 === undefined && data.文件 === undefined) {
      ['内容', '文件'].forEach(key =>
        context.addIssue({
          code: 'custom',
          path: [key],
          message: '必须填写`内容`或`文件`',
        }),
      );
    }
    if (data.内容 !== undefined && data.文件 !== undefined) {
      ['内容', '文件'].forEach(key =>
        context.addIssue({
          code: 'custom',
          path: [key],
          message: '不能同时填写`内容`和`文件`',
        }),
      );
    }
  });

export type Worldbook = z.infer<typeof Worldbook>;
export const Worldbook = z.object({ 条目: z.array(Worldbook_entry).min(1) });
