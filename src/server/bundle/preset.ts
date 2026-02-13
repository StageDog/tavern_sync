import { from_tavern_regex } from '@server/bundle/tavern_regex';
import { Preset, PromptLeaf } from '@type/preset.en';
import _ from 'lodash';

type _OriginalPreset = {
  max_context_unlocked: boolean;
  openai_max_context: number;
  openai_max_tokens: number;
  n: number;

  stream_openai: boolean;

  temperature: number;
  frequency_penalty: number;
  presence_penalty: number;
  top_p: number;
  repetition_penalty: number;
  min_p: number;
  top_k: number;
  top_a: number;

  seed: number;

  squash_system_messages: boolean;

  reasoning_effort: 'auto' | 'min' | 'low' | 'medium' | 'high' | 'max';
  show_thoughts: boolean;
  request_images: boolean;
  function_calling: boolean;
  enable_web_search: boolean;

  image_inlining: boolean;
  inline_image_quality: 'auto' | 'low' | 'high';
  video_inlining: boolean;

  names_behavior: -1 | 0 | 2 | 1;
  wrap_in_quotes: boolean;

  prompts: _OriginalPrompt[];
  prompt_order: Array<{
    character_id: 100001;
    order: _OriginalPromptOrder[];
  }>;

  extensions: Record<string, any>;
};

type _OriginalPromptOrder = {
  identifier: string;
  enabled: boolean;
};
type _OriginalPrompt = _OriginalNormalPrompt | _OriginalSystemPrompt | _OriginalPlaceholderPrompt;
type _OriginalNormalPrompt = {
  identifier: string;
  name: string;
  enabled?: boolean;

  injection_position: 0 | 1;
  injection_depth: number;
  injection_order: number;

  role: 'system' | 'user' | 'assistant';
  content: string;

  system_prompt: false;
  marker?: false;

  extra?: Record<string, any>;

  forbid_overrides: false;
};
type _OriginalSystemPrompt = {
  identifier: 'main' | 'nsfw' | 'jailbreak' | 'enhanceDefinitions';
  name: string;
  enabled?: boolean;

  role: 'system' | 'user' | 'assistant';
  content: string;

  system_prompt: true;
  marker?: false;

  extra?: Record<string, any>;

  forbid_overrides: false;
};
type _OriginalPlaceholderPrompt = {
  identifier:
    | 'worldInfoBefore'
    | 'personaDescription'
    | 'charDescription'
    | 'charPersonality'
    | 'scenario'
    | 'worldInfoAfter'
    | 'dialogueExamples'
    | 'chatHistory';
  name: string;
  enabled?: boolean;

  injection_position: 0 | 1;
  injection_depth: number;
  injection_order: number;

  role: 'system' | 'user' | 'assistant';
  content?: never;

  system_prompt: true;
  marker?: true;

  extra?: Record<string, any>;
};
function fromPresetPrompt(prompt: PromptLeaf): _OriginalPrompt {
  const is_system_prompt = prompt.id === 'main';
  const is_placeholder_prompt = !is_system_prompt && Number.isNaN(parseInt(prompt.id));
  const is_normal_prompt = !is_system_prompt && !is_placeholder_prompt;

  let result = _({}).set('identifier', prompt.id).set('name', prompt.name).set('enabled', prompt.enabled);

  if ((is_normal_prompt || is_placeholder_prompt) && !['dialogueExamples', 'chatHistory'].includes(prompt.id)) {
    result = result
      .set('injection_position', (prompt.position?.type ?? 'relative') === 'relative' ? 0 : 1)
      .set('injection_depth', prompt.position?.depth ?? 4)
      .set('injection_order', prompt.position?.order ?? 100);
  }

  result = result.set('role', prompt.role);
  if (is_normal_prompt || is_system_prompt) {
    result = result.set('content', prompt.content);
  }

  result = result.set('system_prompt', is_system_prompt || is_placeholder_prompt).set('marker', is_placeholder_prompt);

  if (prompt.extra) {
    result = result.set('extra', prompt.extra);
  }

  result = result.set('forbid_overrides', false);

  return result.value() as _OriginalPrompt;
}

export function bundle_preset(preset: Preset): _OriginalPreset {
  const prompt_used = preset.prompts.map(prompt => fromPresetPrompt(prompt));
  const prompt_unused = preset.prompts_unused.map(prompt => fromPresetPrompt(prompt));

  return {
    max_context_unlocked: true,
    openai_max_context: preset.settings.max_context,
    openai_max_tokens: preset.settings.max_completion_tokens,
    n: preset.settings.reply_count,

    stream_openai: preset.settings.should_stream,

    temperature: preset.settings.temperature,
    frequency_penalty: preset.settings.frequency_penalty,
    presence_penalty: preset.settings.presence_penalty,
    top_p: preset.settings.top_p,
    repetition_penalty: preset.settings.repetition_penalty,
    min_p: preset.settings.min_p,
    top_k: preset.settings.top_k,
    top_a: preset.settings.top_a,

    seed: preset.settings.seed,

    squash_system_messages: preset.settings.squash_system_messages,

    reasoning_effort: preset.settings.reasoning_effort,
    show_thoughts: preset.settings.request_thoughts,
    request_images: preset.settings.request_images,
    function_calling: preset.settings.enable_function_calling,
    enable_web_search: preset.settings.enable_web_search,

    image_inlining: preset.settings.allow_sending_images !== 'disabled',
    inline_image_quality:
      preset.settings.allow_sending_images === 'disabled' ? 'auto' : preset.settings.allow_sending_images,
    video_inlining: preset.settings.allow_sending_videos,

    names_behavior: (
      {
        none: -1,
        default: 0,
        content: 2,
        completion: 1,
      } as const
    )[preset.settings.character_name_prefix],
    wrap_in_quotes: preset.settings.wrap_user_messages_in_quotes,

    prompts: [...prompt_used, ...prompt_unused],
    prompt_order: [
      {
        character_id: 100001,
        order: prompt_used.map(prompt => ({ identifier: prompt.identifier, enabled: prompt.enabled ?? true })),
      },
    ],

    extensions: {
      regex_scripts: preset.extensions?.regex_scripts?.map((script: any) => from_tavern_regex(script)) ?? [],
      tavern_helper: preset.extensions?.tavern_helper ?? {},
      ..._.omit(preset.extensions, 'regex_scripts', 'tavern_helper'),
    },
  };
}
