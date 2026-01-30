import uuid from 'uuid-random';
import * as z from 'zod';

const ScriptButton = z.object({
  name: z.coerce.string(),
  visible: z.boolean(),
});

const Script = z.object({
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
  data: z.record(z.string(), z.any()).prefault({}).catch({}),
});

const ScriptFolder = z.object({
  name: z.coerce.string(),
  id: z.coerce.string().prefault(uuid),
  enabled: z.boolean(),
  type: z.literal('folder'),
  icon: z.coerce.string().prefault('fa-solid fa-folder'),
  color: z.coerce.string().prefault('rgba(219, 219, 214, 1)'),
  scripts: z.array(Script).prefault([]).catch([]),
});

const ScriptTree = z.discriminatedUnion('type', [Script, ScriptFolder]);

export type Extensions = z.infer<typeof Extensions>;
export const Extensions = z.looseObject({
  regex_scripts: z.array(
    z.object({
      script_name: z.coerce.string(),
      id: z.coerce.string().prefault(uuid),
      enabled: z.boolean(),

      find_regex: z.coerce.string(),
      replace_string: z.coerce.string(),

      source: z.object({
        user_input: z.boolean(),
        ai_output: z.boolean(),
        slash_command: z.boolean().prefault(false),
        world_info: z.boolean().prefault(false),
      }),

      destination: z.object({
        display: z.boolean(),
        prompt: z.boolean(),
      }),
      run_on_edit: z.boolean().prefault(false),

      min_depth: z.union([z.number(), z.null()]).prefault(null),
      max_depth: z.union([z.number(), z.null()]).prefault(null),
    }),
  ),
  tavern_helper: z.object({
    scripts: z.array(ScriptTree).prefault([]).catch([]),
    variables: z.record(z.string(), z.any()).prefault({}).catch({}),
  }),
});
