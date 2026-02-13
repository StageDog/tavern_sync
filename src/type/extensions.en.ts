import uuid from 'uuid-random';
import * as z from 'zod';

const ScriptButton = z.strictObject({
  name: z.coerce.string(),
  visible: z.boolean(),
});

const Script = z.strictObject({
  name: z.coerce.string(),
  id: z.coerce.string().prefault(uuid),
  enabled: z.boolean(),
  type: z.literal('script'),
  content: z.coerce.string(),
  info: z.coerce.string().prefault(''),
  button: z
    .object({
      enabled: z.boolean().prefault(true),
      buttons: z.array(ScriptButton).prefault([]),
    })
    .prefault({}),
  data: z.record(z.string(), z.any()).prefault({}),
});

const ScriptFolder = z.strictObject({
  name: z.coerce.string(),
  id: z.coerce.string().prefault(uuid),
  enabled: z.boolean(),
  type: z.literal('folder'),
  icon: z.coerce.string().prefault('fa-solid fa-folder'),
  color: z.coerce.string().prefault('rgba(219, 219, 214, 1)'),
  scripts: z.array(Script).prefault([]),
});

const ScriptTree = z.discriminatedUnion('type', [Script, ScriptFolder]);

export type Extensions = z.infer<typeof Extensions>;
export const Extensions = z.looseObject({
  regex_scripts: z
    .array(
      z
        .strictObject({
          script_name: z.coerce.string(),
          id: z.coerce.string().prefault(uuid),
          enabled: z.boolean(),

          find_regex: z.coerce.string(),
          replace_string: z.coerce.string().optional().describe(`已弃用, 请使用 'content' 或 'file'`),
          trim_strings: z.array(z.coerce.string()).default([]),
          content: z.coerce.string().optional().describe('要替换为的内容'),
          file: z.coerce.string().optional().describe('要替换为的内容所在的文件路径'),

          source: z.strictObject({
            user_input: z.boolean(),
            ai_output: z.boolean(),
            slash_command: z.boolean().prefault(false),
            world_info: z.boolean().prefault(false),
          }),

          destination: z.strictObject({
            display: z.boolean(),
            prompt: z.boolean(),
          }),
          run_on_edit: z.boolean().prefault(false),

          min_depth: z.union([z.number(), z.null()]).prefault(null),
          max_depth: z.union([z.number(), z.null()]).prefault(null),
        })
        .transform(data => {
          if (data.replace_string !== undefined) {
            _.set(data, 'content', data.replace_string);
            _.unset(data, 'replace_string');
          }
          return data;
        })
        .superRefine((data, context) => {
          if (data.content === undefined && data.file === undefined) {
            ['content', 'file'].forEach(key =>
              context.addIssue({
                code: 'custom',
                path: [key],
                message: '必须填写 `content` 或 `file`',
              }),
            );
          }
          if (data.content !== undefined && data.file !== undefined) {
            ['content', 'file'].forEach(key =>
              context.addIssue({
                code: 'custom',
                path: [key],
                message: '不能同时填写 `content` 和 `file`',
              }),
            );
          }
        }),
    )
    .prefault([]),
  tavern_helper: z
    .strictObject({
      scripts: z.array(ScriptTree).prefault([]),
      variables: z.record(z.string(), z.any()).prefault({}),
    })
    .prefault({}),
});
