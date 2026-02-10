import uuid from 'uuid-random';
import * as z from 'zod';

export const zh_to_en_map = {
  正则: 'regex_scripts',
  酒馆助手: 'tavern_helper',
  脚本库: 'scripts',
  变量: 'variables',

  正则名称: 'script_name',
  启用: 'enabled',
  查找表达式: 'find_regex',
  替换为: 'replace_string',
  来源: 'source',
  用户输入: 'user_input',
  AI输出: 'ai_output',
  快捷命令: 'slash_command',
  世界信息: 'world_info',
  作用于: 'destination',
  仅格式显示: 'display',
  仅格式提示词: 'prompt',
  在编辑时运行: 'run_on_edit',
  最小深度: 'min_depth',
  最大深度: 'max_depth',

  类型: 'type',
  脚本: 'script',
  文件夹: 'folder',
  名称: 'name',
  内容: 'content',
  介绍: 'info',
  按钮: 'button',
  按钮列表: 'buttons',
  数据: 'data',
  可见: 'visible',
};

const ScriptButton = z.strictObject({
  名称: z.coerce.string(),
  可见: z.boolean(),
});

const Script = z.strictObject({
  名称: z.coerce.string(),
  id: z.coerce.string().prefault(uuid),
  启用: z.boolean(),
  类型: z.literal('脚本'),
  内容: z.coerce.string(),
  介绍: z.coerce.string().prefault(''),
  按钮: z
    .object({
      启用: z.boolean().prefault(true),
      按钮列表: z.array(ScriptButton).prefault([]),
    })
    .prefault({}),
  数据: z.record(z.string(), z.any()).prefault({}),
});

const ScriptFolder = z.strictObject({
  名称: z.coerce.string(),
  id: z.coerce.string().prefault(uuid),
  启用: z.boolean(),
  类型: z.literal('文件夹'),
  图标: z.coerce.string().prefault('fa-solid fa-folder'),
  颜色: z.coerce.string().prefault('#DBDBD6'),
  脚本库: z.array(Script).prefault([]),
});

const ScriptTree = z.discriminatedUnion('类型', [Script, ScriptFolder]);

export type Extensions = z.infer<typeof Extensions>;
export const Extensions = z.looseObject({
  正则: z
    .array(
      z
        .strictObject({
          正则名称: z.coerce.string(),
          id: z.coerce.string().prefault(uuid),
          启用: z.boolean(),

          查找表达式: z.coerce.string(),
          替换为: z.coerce.string().optional().describe(`已弃用, 请使用 '内容' 或 '文件'`),
          内容: z.coerce.string().optional().describe('要替换为的内容'),
          文件: z.coerce.string().optional().describe('要替换为的内容所在的文件路径'),

          来源: z.strictObject({
            用户输入: z.boolean(),
            AI输出: z.boolean(),
            快捷命令: z.boolean().prefault(false),
            世界信息: z.boolean().prefault(false),
          }),

          作用于: z.strictObject({
            仅格式显示: z.boolean(),
            仅格式提示词: z.boolean(),
          }),
          在编辑时运行: z.boolean().prefault(false),

          最小深度: z.union([z.number(), z.null()]).prefault(null),
          最大深度: z.union([z.number(), z.null()]).prefault(null),
        })
        .transform(data => {
          if (data.替换为 !== undefined) {
            _.set(data, '内容', data.替换为);
            _.unset(data, '内容');
          }
          return data;
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
        }),
    )
    .prefault([]),
  酒馆助手: z
    .strictObject({
      脚本库: z.array(ScriptTree).prefault([]),
      变量: z.record(z.string(), z.any()).prefault({}),
    })
    .prefault({}),
});
