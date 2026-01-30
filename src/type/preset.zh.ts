import { Extensions, zh_to_en_map as extensions_zh_to_en_map } from '@type/extensions.zh';
import dedent from 'dedent';
import _ from 'lodash';
import * as z from 'zod';

export const zh_to_en_map = {
  插入位置: 'position',
  相对: 'relative',
  聊天中: 'in_chat',
  深度: 'depth',
  顺序: 'order',
  角色: 'role',
  系统: 'system',
  用户: 'user',
  AI: 'assistant',
  文件: 'file',
  额外字段: 'extra',

  角色定义之前: 'world_info_before',
  玩家描述: 'persona_description',
  角色描述: 'char_description',
  角色性格: 'char_personality',
  情景: 'scenario',
  角色定义之后: 'world_info_after',
  对话示例: 'dialogue_examples',
  聊天记录: 'chat_history',

  条目: 'entries',

  设置: 'settings',
  上下文长度: 'max_context',
  最大回复token数: 'max_completion_tokens',
  每次回复数: 'reply_count',
  流式传输: 'should_stream',
  温度: 'temperature',
  频率惩罚: 'frequency_penalty',
  存在惩罚: 'presence_penalty',
  重复惩罚: 'repetition_penalty',
  种子: 'seed',
  压缩系统消息: 'squash_system_messages',
  推理强度: 'reasoning_effort',
  自动: 'auto',
  最小: 'min',
  低: 'low',
  中: 'medium',
  高: 'high',
  最大: 'max',
  请求思维链: 'request_thoughts',
  请求图片: 'request_images',
  启用函数调用: 'enable_function_calling',
  启用网络搜索: 'enable_web_search',
  允许发送图片: 'allow_sending_images',
  禁用: 'disabled',
  允许发送视频: 'allow_sending_videos',
  角色名称前缀: 'character_name_prefix',
  无: 'none',
  默认: 'default',
  补全对象: 'completion',
  用引号包裹用户消息: 'wrap_user_messages_in_quotes',

  锚点: 'anchors',
  提示词: 'prompts',
  未添加的提示词: 'prompts_unused',

  扩展字段: 'extensions',
  ...extensions_zh_to_en_map,
} as const;
export function is_zh(data: Record<string, any>): boolean {
  return _.has(data, '提示词');
}

const Prompt_normal = z
  .strictObject({
    名称: z.coerce.string(),
    id: z.never().optional(),
    启用: z.boolean(),

    插入位置: z
      .strictObject({
        类型: z.enum(['相对', '聊天中']),
        深度: z.number().optional(),
        顺序: z.number().optional(),
      })
      .prefault({ 类型: '相对' })
      .superRefine((data, context) => {
        if (data.类型 === '聊天中' && (data.深度 === undefined || data.顺序 === undefined)) {
          context.addIssue({
            code: 'custom',
            path: ['插入位置'],
            message: '当插入位置设置为`聊天中`时, 必须设置`深度`和`顺序`',
          });
        }
      })
      .describe('插入位置: `相对`则按提示词相对位置插入, `聊天中`则插入到聊天记录中的对应深度'),

    角色: z.enum(['系统', '用户', 'AI']).prefault('系统'),
    内容: z.coerce.string().optional().describe('内嵌的提示词内容'),
    文件: z.string().optional().describe('外链的提示词文件路径'),

    额外字段: z.record(z.string(), z.any()).optional().describe('额外字段: 用于为预设提示词绑定额外数据'),
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
  .transform(data => {
    const unique_id = _.uniqueId();
    return {
      ...data,
      id: unique_id === '1' ? 'main' : unique_id,
    };
  })
  .describe('手动在预设中添加的提示词');

const prompt_rolable_placeholder_ids = <const>[
  '角色定义之前',
  '玩家描述',
  '角色描述',
  '角色性格',
  '情景',
  '角色定义之后',
];
const prompt_unrolable_placeholder_ids = <const>['对话示例', '聊天记录'];
export const prompt_placeholder_ids = <const>[...prompt_rolable_placeholder_ids, ...prompt_unrolable_placeholder_ids];
const Prompt_placeholder = z
  .strictObject({
    名称: z.never().optional(),
    id: z.enum(prompt_placeholder_ids).describe(
      dedent(`
        预设提示词中的占位符提示词, 对应于世界书条目、角色卡、玩家角色、聊天记录等提示词
        - 角色定义之前: world_info_before
        - 玩家描述: persona_description. 创建 user 时填写的提示词
        - 角色描述: char_description. 角色卡侧边栏中填写的提示词
        - 角色性格: char_personality. 角色卡高级定义中的提示词, 一般没人用了
        - 情景: scenario. 角色卡高级定义中的提示词, 一般没人用了
        - 角色定义之后: world_info_after
        - 对话示例: dialogue_examples. 角色卡高级定义中的提示词, 一般没人用了
        - 聊天记录: chat_history
      `),
    ),
    启用: z.boolean(),

    插入位置: z
      .strictObject({
        类型: z.enum(['相对', '聊天中']),
        深度: z.number().optional(),
        顺序: z.number().optional(),
      })
      .prefault({ 类型: '相对' })
      .superRefine((data, context) => {
        if (data.类型 === '聊天中' && (data.深度 === undefined || data.顺序 === undefined)) {
          context.addIssue({
            code: 'custom',
            path: ['插入位置'],
            message: '当插入位置设置为`聊天中`时, 必须设置`深度`和`顺序`',
          });
        }
      })
      .describe('插入位置: `相对`则按提示词相对位置插入, `聊天中`则插入到聊天记录中的对应深度'),

    角色: z.enum(['系统', '用户', 'AI']).optional(),
    内容: z.never().optional(),
    文件: z.never().optional(),

    额外字段: z.record(z.string(), z.any()).optional().describe('额外字段: 用于为预设提示词绑定额外数据'),
  })
  .superRefine((data, context) => {
    if (_.includes(prompt_unrolable_placeholder_ids, data.id) && data.角色 !== undefined) {
      context.addIssue({
        code: 'custom',
        message: `占位符提示词 '${data.id}' 不能设置自定义\`角色\``,
        path: ['角色'],
      });
    }
  })
  .transform(data => ({
    ...data,
    角色: data.角色 ?? '系统',
    名称: (
      {
        角色定义之前: 'World Info (before) - 角色定义之前',
        玩家描述: 'Persona Description - 玩家描述',
        角色描述: 'Char Description - 角色描述',
        角色性格: 'Char Personality - 角色性格',
        情景: 'Scenario - 情景',
        角色定义之后: 'World Info (after) - 角色定义之后',
        对话示例: 'Chat Examples - 对话示例',
        聊天记录: 'Chat History - 聊天记录',
      } as const
    )[data.id as (typeof prompt_placeholder_ids)[number]],
  }))
  .describe('预设提示词中的占位符提示词, 对应于世界书条目、角色卡、玩家角色、聊天记录等提示词');

const PromptLeaf = z.union([Prompt_normal, Prompt_placeholder]);
const PromptBranch = z.object({
  文件夹: z.string(),
  get 条目() {
    return z.array(z.union([PromptLeaf, PromptBranch]));
  },
});
const PromptTree = z.union([PromptLeaf, PromptBranch]);
function is_prompt_branch(data: z.infer<typeof PromptTree>): data is z.infer<typeof PromptBranch> {
  return _.has(data, '文件夹');
}
function flatten_tree(data: z.infer<typeof PromptTree>): z.infer<typeof PromptLeaf>[] {
  if (is_prompt_branch(data)) {
    return data.条目.flatMap(flatten_tree);
  }
  return [data];
}
const PromptTrees = z.array(PromptTree).transform(data => data.flatMap(flatten_tree));

export type Preset = z.infer<typeof Preset>;
export const Preset = z.strictObject({
  设置: z.strictObject({
    上下文长度: z
      .number()
      .min(0)
      .max(2000000)
      .describe(
        '最大上下文 token 数. 酒馆计算出的上下文 token 数虚高, 容易在上下文 token 数没有达到限制时就报错, 因此建议调到最大 2000000',
      ),
    最大回复token数: z.number().min(0).describe('最大回复 token 数'),
    每次回复数: z.number().min(1).prefault(1).describe('每次生成几个回复'),

    流式传输: z.boolean().describe('是否流式传输'),

    温度: z.number().min(0).max(2).describe('温度'),
    频率惩罚: z.number().min(-2).max(2).describe('频率惩罚'),
    存在惩罚: z.number().min(-2).max(2).describe('存在惩罚'),
    top_p: z.number().min(0).max(1),
    重复惩罚: z.number().min(1).max(2).prefault(1).describe('重复惩罚'),
    min_p: z.number().min(0).max(1).prefault(0),
    top_k: z.number().min(0).max(500).prefault(0),
    top_a: z.number().min(0).max(1).prefault(0),

    种子: z.number().prefault(-1).describe('种子, -1 表示随机'),

    压缩系统消息: z.boolean().describe('压缩系统消息: 将连续的系统消息合并为一条消息'),

    推理强度: z
      .enum(['自动', '最小', '低', '中', '高', '最大'])
      .describe('推理强度, 即内置思维链的投入程度. 例如, 如果酒馆直连 gemini-2.5-flash, 则`最小`将会不使用内置思维链'),
    请求思维链: z
      .boolean()
      .prefault(true)
      .describe(
        '请求思维链: 允许模型返回内置思维链的思考过程; 注意这只影响内置思维链显不显示, 不决定模型是否使用内置思维链',
      ),
    请求图片: z.boolean().prefault(true).describe('请求图片: 允许模型在回复中返回图片'),
    启用函数调用: z
      .boolean()
      .prefault(true)
      .describe('启用函数调用: 允许模型使用函数调用功能; 比如 cursor 借此在回复中读写文件、运行命令'),
    启用网络搜索: z.boolean().prefault(true).describe('启用网络搜索: 允许模型使用网络搜索功能'),

    允许发送图片: z.enum(['禁用', '自动', '低', '高']).prefault('自动').describe('是否允许发送图片作为提示词'),
    允许发送视频: z.boolean().prefault(true).describe('是否允许发送视频作为提示词'),

    角色名称前缀: z
      .enum(['无', '默认', '内容', '补全'])
      .prefault('无')
      .describe(
        dedent(`
        角色名称前缀: 是否要为消息添加角色名称前缀, 以及怎么添加
        - 无: 不添加
        - 默认: 为与角色卡不同名的消息添加角色名称前缀, 添加到 \`content\` 字段开头 (即发送的消息内容是 \`角色名: 消息内容\`)
        - 内容: 为所有消息添加角色名称前缀, 添加到 \`content\` 字段开头 (即发送的消息内容是 \`角色名: 消息内容\`)
        - 补全: 在发送给模型时, 将角色名称写入到 \`name\` 字段; 仅支持字母数字和下划线, 不适用于 Claude、Google 等模型
      `),
      ),

    用引号包裹用户消息: z
      .boolean()
      .prefault(false)
      .describe('用引号包裹用户消息: 在发送给模型之前, 将所有用户消息用引号包裹'),
  }),

  锚点: z.record(z.string(), z.any()).optional().describe('用于存放 YAML 锚点, 不会被实际使用'),

  提示词: PromptTrees.superRefine((data, context) => {
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
  未添加的提示词: PromptTrees.describe('下拉框里的, 没有添加进提示词列表的提示词'),

  扩展字段: Extensions.optional().describe('扩展字段: 用于为预设绑定额外数据'),
});
