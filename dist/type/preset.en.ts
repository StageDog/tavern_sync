import { randomUUID } from 'node:crypto';
import * as z from 'zod';

export type Prompt_normal = z.infer<typeof Prompt_normal>;
export const Prompt_normal = z.object({
  id: z.string().default(randomUUID()),
  enabled: z.boolean(),
  name: z.string(),
  /** 插入位置: `'relative'` 则按提示词相对位置插入, `number` 则插入到聊天记录中的对应深度 */
  position: z.enum(['relative', 'number']),

  role: z.enum(['system', 'user', 'assistant']),
  content: z.string(),

  /** 额外字段, 用于为预设提示词绑定额外数据 */
  extra: z.record(z.string(), z.any()).optional(),
});

/** 预设中的酒馆系统提示词, 但其实相比于手动添加的提示词没有任何优势 */
export type Prompt_system = z.infer<typeof Prompt_system>;
export const Prompt_system = z.object({
  id: z.enum(['main', 'nsfw', 'jailbreak', 'enhanceDefinitions']),
  enabled: z.boolean(),
  name: z.string(),

  role: z.enum(['system', 'user', 'assistant']),
  content: z.string(),

  /** 额外字段, 用于为预设提示词绑定额外数据 */
  extra: z.record(z.string(), z.any()).optional(),
});

/** 预设提示词中的占位符提示词, 对应于世界书条目、角色卡、玩家角色、聊天记录等提示词 */
export type Prompt_placeholder = z.infer<typeof Prompt_placeholder>;
export const Prompt_placeholder = z
  .object({
    id: z.enum([
      'world_info_before',
      'persona_description',
      'char_description',
      'char_personality',
      'scenario',
      'world_info_after',
      'dialogue_examples',
      'chat_history',
    ]),
    enabled: z.boolean(),
    name: z.string().optional(),
    /** 插入位置: `'relative'` 则按提示词相对位置插入, `number` 则插入到聊天记录中的对应深度 */
    position: z.enum(['relative', 'number']),

    role: z.enum(['system', 'user', 'assistant']),
    content: z.string(),

    /** 额外字段, 用于为预设提示词绑定额外数据 */
    extra: z.record(z.string(), z.any()).optional(),
  })
  .transform(data => ({
    ...data,
    name:
      data.name ??
      {
        world_info_before: '角色定义之前',
        persona_description: '角色卡描述',
        char_description: '角色描述',
        char_personality: '角色性格',
        scenario: '情景',
        world_info_after: '角色定义之后',
        dialogue_examples: '对话示例',
        chat_history: '聊天记录',
      }[data.id],
  }));

export type Prompt = z.infer<typeof Prompt>;
export const Prompt = z.discriminatedUnion('id', [Prompt_normal, Prompt_system, Prompt_placeholder]);

export type Preset = z.infer<typeof Preset>;
export const Preset = z.object({
  settings: z.object({
    /** 最大上下文 token 数 */
    max_context: z.number().min(0),
    /** 最大回复 token 数 */
    max_completion_tokens: z.number().min(0),
    /** 每次生成几个回复 */
    reply_count: z.number().min(1),

    /** 是否流式传输 */
    should_stream: z.boolean(),

    /** 温度 */
    temperature: z.number().min(0).max(2),
    /** 频率惩罚 */
    frequency_penalty: z.number().min(-2).max(2),
    /** 存在惩罚 */
    presence_penalty: z.number().min(-2).max(2),
    /** 重复惩罚 */
    repetition_penalty: z.number().min(1).max(2),
    top_p: z.number().min(0).max(1),
    min_p: z.number().min(0).max(1),
    top_k: z.number().min(0).max(500),
    top_a: z.number().min(0).max(1),

    /** 种子, -1 表示随机 */
    seed: z.number(),

    /** 压缩系统消息: 将连续的系统消息合并为一条消息 */
    squash_system_messages: z.boolean(),

    /** 推理强度, 即内置思维链的投入程度. 例如, 如果酒馆直连 gemini-2.5-flash, 则 `min` 将会不使用内置思维链 */
    reasoning_effort: z.enum(['auto', 'min', 'low', 'medium', 'high', 'max']),
    /** 请求思维链: 允许模型返回内置思维链的思考过程; 注意这只影响内置思维链显不显示, 不决定模型是否使用内置思维链 */
    request_thoughts: z.boolean(),
    /** 请求图片: 允许模型在回复中返回图片 */
    request_images: z.boolean(),
    /** 启用函数调用: 允许模型使用函数调用功能; 比如 cursor 借此在回复中读写文件、运行命令 */
    enable_function_calling: z.boolean(),
    /** 启用网络搜索: 允许模型使用网络搜索功能 */
    enable_web_search: z.boolean(),

    /** 是否允许发送图片作为提示词 */
    allow_images: z.enum(['disabled', 'auto', 'low', 'high']),
    /** 是否允许发送视频作为提示词 */
    allow_videos: z.boolean(),

    /**
     * 角色名称前缀: 是否要为消息添加角色名称前缀, 以及怎么添加
     * - `none`: 不添加
     * - `default`: 为与角色卡不同名的消息添加角色名称前缀, 添加到 `content` 字段开头 (即发送的消息内容是 `角色名: 消息内容`)
     * - `content`: 为所有消息添加角色名称前缀, 添加到 `content` 字段开头 (即发送的消息内容是 `角色名: 消息内容`)
     * - `completion`: 在发送给模型时, 将角色名称写入到 `name` 字段; 仅支持字母数字和下划线, 不适用于 Claude、Google 等模型
     */
    character_name_prefix: z.enum(['none', 'default', 'content', 'completion']),
    /** 用引号包裹用户消息: 在发送给模型之前, 将所有用户消息用引号包裹 */
    wrap_user_messages_in_quotes: z.boolean(),
  }),

  /** 提示词列表里已经添加的提示词 */
  prompts: z.array(Prompt),
  /** 下拉框里没添加进来的提示词 */
  prompts_unused: z.array(Prompt),

  /** 额外字段, 用于为预设绑定额外数据 */
  extensions: z.record(z.string(), z.any()),
});
