import { Extensions, zh_to_en_map as extensions_zh_to_en_map } from '@type/extensions.zh';
import { Worldbook, zh_to_en_map as worldbook_zh_to_en_map } from '@type/worldbook.zh';
import * as z from 'zod';

export const zh_to_en_map = {
  头像: 'avatar',
  版本: 'version',
  作者: 'creator',
  备注: 'creator_notes',
  第一条消息: 'first_messages',
  角色描述: 'description',
  世界书名称: 'worldbook',
  扩展字段: 'extensions',
  ...worldbook_zh_to_en_map,
  ...extensions_zh_to_en_map,
};
export function is_zh(data: Record<string, any>): boolean {
  return _.has(data, '头像');
}

export type Character = z.infer<typeof Character>;
export const Character = z.strictObject({
  头像: z.string(),
  版本: z.string(),
  作者: z.string(),
  备注: z.string(),

  第一条消息: z
    .array(
      z
        .object({
          内容: z.coerce.string().optional().describe('内嵌的提示词内容'),
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
        })
        .default({ 内容: '' }),
    )
    .prefault([{}]),

  角色描述: z.string().default(''),

  锚点: Worldbook.shape.锚点,

  世界书名称: z.string(),
  条目: Worldbook.shape.条目,

  扩展字段: Extensions.optional().describe('扩展字段: 用于为预设绑定额外数据'),
});
