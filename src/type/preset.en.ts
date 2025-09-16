import dedent from 'dedent';
import _ from 'lodash';
import * as z from 'zod';

const Prompt_normal = z
  .strictObject({
    name: z.string(),
    id: z.never().optional(),
    enabled: z.boolean(),

    position: z
      .strictObject({
        type: z.enum(['relative', 'in_chat']),
        depth: z.number().optional(),
        order: z.number().optional(),
      })
      .prefault({ type: 'relative' })
      .superRefine((data, context) => {
        if (data.type === 'in_chat' && (data.depth === undefined || data.order === undefined)) {
          context.addIssue({
            code: 'custom',
            path: ['position'],
            message: '当插入位置设置为`in_chat`时, 必须设置`depth`和`order`',
          });
        }
      })
      .describe('插入位置: `relative` 则按提示词相对位置插入, `in_chat` 则插入到聊天记录中的对应深度'),

    role: z.enum(['system', 'user', 'assistant']).prefault('system'),
    content: z.string().optional().describe('内嵌的提示词内容'),
    file: z.string().optional().describe('外链的提示词文件路径'),

    extra: z.record(z.string(), z.any()).optional().describe('额外字段: 用于为预设提示词绑定额外数据'),
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
  })
  .transform(data => ({
    ...data,
    id: _.uniqueId(),
  }))
  .describe('手动在预设中添加的提示词');

export const prompt_rolable_placeholder_ids = <const>[
  'world_info_before',
  'persona_description',
  'char_description',
  'char_personality',
  'scenario',
  'world_info_after',
];
export const prompt_unrolable_placeholder_ids = <const>['dialogue_examples', 'chat_history'];
export const prompt_placeholder_ids = <const>[...prompt_rolable_placeholder_ids, ...prompt_unrolable_placeholder_ids];
const Prompt_placeholder = z
  .strictObject({
    name: z.never().optional(),
    id: z.enum(prompt_placeholder_ids).describe(
      dedent(`
        预设提示词中的占位符提示词, 对应于世界书条目、角色卡、玩家角色、聊天记录等提示词
        - world_info_before: 角色定义之前
        - persona_description: 玩家描述. 创建 user 时填写的提示词
        - char_description: 角色描述. 角色卡侧边栏中填写的提示词
        - char_personality: 角色性格. 角色卡高级定义中的提示词, 一般没人用了
        - scenario: 情景. 角色卡高级定义中的提示词, 一般没人用了
        - world_info_after: 角色定义之后
        - dialogue_examples: 对话示例. 角色卡高级定义中的提示词, 一般没人用了
        - chat_history: 聊天记录
      `),
    ),
    enabled: z.boolean(),

    position: z
      .strictObject({
        type: z.enum(['relative', 'in_chat']),
        depth: z.number().optional(),
        order: z.number().optional(),
      })
      .prefault({ type: 'relative' })
      .superRefine((data, context) => {
        if (data?.type === 'in_chat' && (data.depth === undefined || data.order === undefined)) {
          context.addIssue({
            code: 'custom',
            path: ['position'],
            message: '当插入位置设置为`in_chat`时, 必须设置`depth`和`order`',
          });
        }
      })
      .describe('插入位置: `relative` 则按提示词相对位置插入, `in_chat` 则插入到聊天记录中的对应深度'),

    role: z.enum(['system', 'user', 'assistant']).optional(),
    content: z.never().optional(),
    file: z.never().optional(),

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
    role: data.role ?? 'system',
    name: (
      {
        world_info_before: 'World Info (before) - 角色定义之前',
        persona_description: 'Persona Description - 玩家描述',
        char_description: 'Char Description - 角色描述',
        char_personality: 'Char Personality - 角色性格',
        scenario: 'Scenario - 情景',
        world_info_after: 'World Info (after) - 角色定义之后',
        dialogue_examples: 'Chat Examples - 对话示例',
        chat_history: 'Chat History - 聊天记录',
      } as const
    )[data.id as (typeof prompt_placeholder_ids)[number]],
  }))
  .describe('预设提示词中的占位符提示词, 对应于世界书条目、角色卡、玩家角色、聊天记录等提示词');

const PromptLeaf = z.union([Prompt_normal, Prompt_placeholder]);
const PromptBranch = z.object({
  folder: z.string(),
  get entries() {
    return z.array(z.union([PromptLeaf, PromptBranch]));
  },
});
const PromptTree = z.union([PromptLeaf, PromptBranch]);
function is_prompt_branch(data: z.infer<typeof PromptTree>): data is z.infer<typeof PromptBranch> {
  return _.has(data, 'folder');
}
function flatten_tree(data: z.infer<typeof PromptTree>): z.infer<typeof PromptLeaf>[] {
  if (is_prompt_branch(data)) {
    return data.entries.flatMap(flatten_tree);
  }
  return [data];
}
const PromptTrees = z.array(PromptTree).transform(data => data.flatMap(flatten_tree));

export type Preset = z.infer<typeof Preset>;
export const Preset = z.strictObject({
  settings: z.strictObject({
    max_context: z
      .number()
      .min(0)
      .max(2000000)
      .describe(
        '最大上下文 token 数. 酒馆计算出的上下文 token 数虚高, 容易在上下文 token 数没有达到限制时就报错, 因此建议调到最大 2000000',
      ),
    max_completion_tokens: z.number().min(0).describe('最大回复 token 数'),
    reply_count: z.number().min(1).prefault(1).describe('每次生成几个回复'),

    should_stream: z.boolean().describe('是否流式传输'),

    temperature: z.number().min(0).max(2).describe('温度'),
    frequency_penalty: z.number().min(-2).max(2).describe('频率惩罚'),
    presence_penalty: z.number().min(-2).max(2).describe('存在惩罚'),
    top_p: z.number().min(0).max(1),
    repetition_penalty: z.number().min(1).max(2).prefault(1).describe('重复惩罚'),
    min_p: z.number().min(0).max(1).prefault(0),
    top_k: z.number().min(0).max(500).prefault(0),
    top_a: z.number().min(0).max(1).prefault(0),

    seed: z.number().prefault(-1).describe('种子, -1 表示随机'),

    squash_system_messages: z.boolean().describe('压缩系统消息: 将连续的系统消息合并为一条消息'),

    reasoning_effort: z
      .enum(['auto', 'min', 'low', 'medium', 'high', 'max'])
      .describe('推理强度, 即内置思维链的投入程度. 例如, 如果酒馆直连 gemini-2.5-flash, 则 `min` 将会不使用内置思维链'),
    request_thoughts: z
      .boolean()
      .prefault(true)
      .describe(
        '请求思维链: 允许模型返回内置思维链的思考过程; 注意这只影响内置思维链显不显示, 不决定模型是否使用内置思维链',
      ),
    request_images: z.boolean().prefault(true).describe('请求图片: 允许模型在回复中返回图片'),
    enable_function_calling: z
      .boolean()
      .prefault(true)
      .describe('启用函数调用: 允许模型使用函数调用功能; 比如 cursor 借此在回复中读写文件、运行命令'),
    enable_web_search: z.boolean().prefault(true).describe('启用网络搜索: 允许模型使用网络搜索功能'),

    allow_sending_images: z
      .enum(['disabled', 'auto', 'low', 'high'])
      .prefault('auto')
      .describe('是否允许发送图片作为提示词'),
    allow_sending_videos: z.boolean().prefault(true).describe('是否允许发送视频作为提示词'),

    character_name_prefix: z
      .enum(['none', 'default', 'content', 'completion'])
      .prefault('none')
      .describe(
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
      .prefault(false)
      .describe('用引号包裹用户消息: 在发送给模型之前, 将所有用户消息用引号包裹'),
  }),

  anchors: z.any().optional().describe('用于存放 YAML 锚点, 不会被实际使用'),

  prompts: PromptTrees.superRefine((data, context) => {
    const duplicate_ids = _(data)
      .filter(prompt => _.includes(prompt_placeholder_ids, prompt.id))
      .groupBy('id')
      .filter(group => group.length > 1)
      .keys()
      .value();
    if (duplicate_ids.length > 0) {
      context.addIssue({
        code: 'custom',
        message: `提示词列表中出现了重复的占位符提示词 id: ${duplicate_ids.join(', ')}`,
      });
    }

    const unused_ids = _.reject(prompt_placeholder_ids, id => data.some(prompt => _.get(prompt, 'id') === id));
    if (unused_ids.length > 0) {
      context.addIssue({
        code: 'custom',
        message: `提示词列表中缺少了这些必须添加的占位符提示词 id: ${unused_ids.join(', ')}`,
      });
    }
  }).describe('提示词列表里已经添加的提示词'),
  prompts_unused: PromptTrees.describe('下拉框里的, 没有添加进提示词列表的提示词'),

  extensions: z.record(z.string(), z.any()).optional().describe('额外字段: 用于为预设绑定额外数据'),
});
