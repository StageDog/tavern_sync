import { Extensions } from '@type/extensions.en';
import { Worldbook } from '@type/worldbook.en';
import * as z from 'zod';

export type Character = z.infer<typeof Character>;
export const Character = z.strictObject({
  avatar: z.coerce.string(),
  version: z.coerce.string(),
  creator: z.coerce.string(),
  creator_notes: z.coerce.string(),

  first_messages: z
    .array(
      z
        .object({
          content: z.coerce.string().optional().describe('内嵌的提示词内容'),
          file: z.coerce.string().optional().describe('外链的提示词文件路径'),
        })
        .superRefine((data, context) => {
          if (data.content === undefined && data.file === undefined) {
            ['content', 'file'].forEach(key =>
              context.addIssue({
                code: 'custom',
                path: [key],
                message: '必须填写`content`或`file`',
              }),
            );
          }
          if (data.content !== undefined && data.file !== undefined) {
            ['content', 'file'].forEach(key =>
              context.addIssue({
                code: 'custom',
                path: [key],
                message: '不能同时填写`content`和`file`',
              }),
            );
          }
        })
        .default({ content: '' }),
    )
    .prefault([{}]),

  description: z.coerce.string().default(''),

  anchors: Worldbook.shape.anchors,

  worldbook: z.coerce.string(),
  entries: Worldbook.shape.entries,

  extensions: Extensions.optional().describe('扩展字段: 用于为预设绑定额外数据'),
});
