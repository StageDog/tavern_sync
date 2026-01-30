import { Extensions } from '@server/tavern/extensions';
import { prompt_placeholder_ids, prompt_unrolable_placeholder_ids } from '@type/preset.en';
import _ from 'lodash';
import * as z from 'zod';

const Prompt = z
  .object({
    name: z.string(),
    id: z.string().transform(_.snakeCase),
    enabled: z.boolean(),

    position: z
      .object({
        type: z.enum(['relative', 'in_chat']),
        depth: z.number().optional(),
        order: z.number().optional(),
      })
      .optional(),

    role: z.enum(['system', 'user', 'assistant']),
    content: z.string().optional(),

    extra: z.record(z.string(), z.any()).optional(),
  })
  .transform(data => {
    if (_.includes(prompt_placeholder_ids, data.id)) {
      _.unset(data, 'name');
      _.unset(data, 'content');

      if (data.position?.type === 'relative') {
        _.unset(data, 'position');
      }

      if (_.includes(prompt_unrolable_placeholder_ids, data.id) || data.role === 'system') {
        _.unset(data, 'role');
      }

      return data;
    }

    _.unset(data, 'id');
    return data;
  });

export type Preset = z.infer<typeof Preset>;
export const Preset = z
  .object({
    settings: z.object({
      max_context: z.number().min(0).max(2000000),
      max_completion_tokens: z.number().min(0),
      reply_count: z.number().min(1),

      should_stream: z.boolean(),

      temperature: z.number().min(0).max(2),
      frequency_penalty: z.number().min(-2).max(2),
      presence_penalty: z.number().min(-2).max(2),
      top_p: z.number().min(0).max(1),
      repetition_penalty: z.number().min(1).max(2),
      min_p: z.number().min(0).max(1),
      top_k: z.number().min(0).max(500),
      top_a: z.number().min(0).max(1),

      seed: z.number(),

      squash_system_messages: z.boolean(),

      reasoning_effort: z.enum(['auto', 'min', 'low', 'medium', 'high', 'max']),
      request_thoughts: z.boolean(),
      request_images: z.boolean(),
      enable_function_calling: z.boolean(),
      enable_web_search: z.boolean(),

      allow_sending_images: z.enum(['disabled', 'auto', 'low', 'high']),
      allow_sending_videos: z.boolean(),

      character_name_prefix: z.enum(['none', 'default', 'content', 'completion']),
      wrap_user_messages_in_quotes: z.boolean(),
    }),

    anchors: z.void().transform(() => ({})),

    prompts: z.array(Prompt),
    prompts_unused: z
      .array(Prompt)
      .transform(prompts =>
        prompts.filter(
          prompt =>
            !_.includes(
              ['Main Prompt', 'Auxiliary Prompt', 'Post-History Instructions', 'Enhance Definitions'],
              prompt.name,
            ) && !_.includes(prompt_placeholder_ids, prompt.id),
        ),
      ),

    extensions: Extensions.optional().describe('扩展字段: 用于为预设绑定额外数据'),
  })
  .transform(data => {
    if (data.settings.reply_count === 1) {
      _.unset(data, 'settings.reply_count');
    }
    if (data.settings.repetition_penalty === 1) {
      _.unset(data, 'settings.repetition_penalty');
    }
    if (data.settings.min_p === 0) {
      _.unset(data, 'settings.min_p');
    }
    if (data.settings.top_a === 0) {
      _.unset(data, 'settings.top_a');
    }
    if (data.settings.top_k === 0) {
      _.unset(data, 'settings.top_k');
    }
    if (data.settings.seed === -1) {
      _.unset(data, 'settings.seed');
    }
    if (data.settings.wrap_user_messages_in_quotes === false) {
      _.unset(data, 'settings.wrap_user_messages_in_quotes');
    }

    if (_.isEmpty(data.extensions)) {
      _.unset(data, 'extensions');
    }
    return data;
  });
