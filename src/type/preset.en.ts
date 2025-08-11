import dedent from 'dedent';
import * as z from 'zod';

const Prompt_normal = z
  .object({
    name: z.string(),
    enabled: z.boolean(),

    position: z
      .enum(['relative', 'number'])
      .default('relative')
      .describe('插入位置: `relative` 则按提示词相对位置插入, `number` 则插入到聊天记录中的对应深度'),

    role: z.enum(['system', 'user', 'assistant']),
    content: z.string().optional(),

    extra: z.record(z.string(), z.any()).optional().describe('额外字段: 用于为预设提示词绑定额外数据'),
  })
  .describe('手动在预设中添加的提示词');

const prompt_rolable_placeholder_ids = <const>[
  'world_info_before',
  'persona_description',
  'char_description',
  'char_personality',
  'scenario',
  'world_info_after',
];
const prompt_unrolable_placeholder_ids = <const>['dialogue_examples', 'chat_history'];
export const prompt_placeholder_ids = <const>[...prompt_rolable_placeholder_ids, ...prompt_unrolable_placeholder_ids];
const Prompt_placeholder = z
  .object({
    id: z.enum(prompt_placeholder_ids),
    enabled: z.boolean(),
    position: z
      .enum(['relative', 'number'])
      .describe('插入位置: `relative` 则按提示词相对位置插入, `number` 则插入到聊天记录中的对应深度'),

    role: z.enum(['system', 'user', 'assistant']).default('system'),

    extra: z.record(z.string(), z.any()).optional().describe('额外字段: 用于为预设提示词绑定额外数据'),
  })
  .superRefine((data, context) => {
    if (_.includes(prompt_unrolable_placeholder_ids, data.id) && data.role !== undefined) {
      context.addIssue({
        code: 'custom',
        message: `占位符提示词 '${data.id}' 不能设置自定义角色 (\`role\`)`,
        path: ['role'],
      });
    }
  })
  .transform(data => ({
    ...data,
    name: {
      world_info_before: 'World Info (before) - 角色定义之前',
      persona_description: 'Persona Description - 角色卡描述',
      char_description: 'Char Description - 角色描述',
      char_personality: 'Char Personality - 角色性格',
      scenario: 'Scenario - 情景',
      world_info_after: 'World Info (after) - 角色定义之后',
      dialogue_examples: 'Chat Examples - 对话示例',
      chat_history: 'Chat History - 聊天记录',
    }[data.id],
  }))
  .describe('预设提示词中的占位符提示词, 对应于世界书条目、角色卡、玩家角色、聊天记录等提示词');

export type Preset = z.infer<typeof Preset>;
export const Preset = z.object({
  settings: z.object({
    max_context: z.number().min(0).max(2000000).describe('最大上下文 token 数'),
    max_completion_tokens: z.number().min(0).describe('最大回复 token 数'),
    reply_count: z.number().min(1).describe('每次生成几个回复'),

    should_stream: z.boolean().describe('是否流式传输'),

    temperature: z.number().min(0).max(2).describe('温度'),
    frequency_penalty: z.number().min(-2).max(2).describe('频率惩罚'),
    presence_penalty: z.number().min(-2).max(2).describe('存在惩罚'),
    repetition_penalty: z.number().min(1).max(2).describe('重复惩罚'),
    top_p: z.number().min(0).max(1),
    min_p: z.number().min(0).max(1),
    top_k: z.number().min(0).max(500),
    top_a: z.number().min(0).max(1),

    seed: z.number().describe('种子, -1 表示随机'),

    squash_system_messages: z.boolean().describe('压缩系统消息: 将连续的系统消息合并为一条消息'),

    reasoning_effort: z
      .enum(['auto', 'min', 'low', 'medium', 'high', 'max'])
      .describe('推理强度, 即内置思维链的投入程度. 例如, 如果酒馆直连 gemini-2.5-flash, 则 `min` 将会不使用内置思维链'),
    request_thoughts: z
      .boolean()
      .describe(
        '请求思维链: 允许模型返回内置思维链的思考过程; 注意这只影响内置思维链显不显示, 不决定模型是否使用内置思维链',
      ),
    request_images: z.boolean().describe('请求图片: 允许模型在回复中返回图片'),
    enable_function_calling: z
      .boolean()
      .describe('启用函数调用: 允许模型使用函数调用功能; 比如 cursor 借此在回复中读写文件、运行命令'),
    enable_web_search: z.boolean().describe('启用网络搜索: 允许模型使用网络搜索功能'),

    allow_images: z.enum(['disabled', 'auto', 'low', 'high']).describe('是否允许发送图片作为提示词'),
    allow_videos: z.boolean().describe('是否允许发送视频作为提示词'),

    character_name_prefix: z.enum(['none', 'default', 'content', 'completion']).describe(
      dedent(`
        角色名称前缀: 是否要为消息添加角色名称前缀, 以及怎么添加
        - none: 不添加
        - default: 为与角色卡不同名的消息添加角色名称前缀, 添加到 \`content\` 字段开头 (即发送的消息内容是 \`角色名: 消息内容\`)
        - content: 为所有消息添加角色名称前缀, 添加到 \`content\` 字段开头 (即发送的消息内容是 \`角色名: 消息内容\`)
        - completion: 在发送给模型时, 将角色名称写入到 \`name\` 字段; 仅支持字母数字和下划线, 不适用于 Claude、Google 等模型
      `),
    ),

    wrap_user_messages_in_quotes: z
      .boolean()
      .describe('用引号包裹用户消息: 在发送给模型之前, 将所有用户消息用引号包裹'),
  }),

  prompts: z
    .array(z.union([Prompt_normal, Prompt_placeholder]))
    .superRefine((data, context) => {
      const unused_ids = _.reject(prompt_placeholder_ids, id => data.some(prompt => _.get(prompt, 'id') === id));
      if (unused_ids.length > 0) {
        context.addIssue({
          code: 'custom',
          message: `提示词列表中缺少了这些必须添加的占位符提示词 id: ${unused_ids.join(', ')}`,
        });
      }
    })
    .describe('提示词列表里已经添加的提示词'),
  prompts_unused: z.array(Prompt_normal).describe('下拉框里的, 没有添加进提示词列表的提示词'),

  extensions: z.record(z.string(), z.any()).describe('额外字段: 用于为预设绑定额外数据'),
});
