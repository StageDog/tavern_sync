export interface Preset {
  settings: {
    /** 最大上下文 token 数 */
    max_context: number;
    /** 最大回复 token 数 */
    max_completion_tokens: number;
    /** 每次生成几个回复 */
    reply_count: number;

    /** 是否流式传输 */
    should_stream: boolean;

    /** 温度 */
    temperature: number;
    /** 频率惩罚 */
    frequency_penalty: number;
    /** 存在惩罚 */
    presence_penalty: number;
    /** 重复惩罚 */
    repetition_penalty: number;
    top_p: number;
    min_p: number;
    top_k: number;
    top_a: number;

    /** 种子, -1 表示随机 */
    seed: number;

    /** 压缩系统消息: 将连续的系统消息合并为一条消息 */
    squash_system_messages: boolean;

    /** 推理强度, 即内置思维链的投入程度. 例如, 如果酒馆直连 gemini-2.5-flash, 则 `min` 将会不使用内置思维链 */
    reasoning_effort: 'auto' | 'min' | 'low' | 'medium' | 'high' | 'max';
    /** 请求思维链: 允许模型返回内置思维链的思考过程; 注意这只影响内置思维链显不显示, 不决定模型是否使用内置思维链 */
    request_thoughts: boolean;
    /** 请求图片: 允许模型在回复中返回图片 */
    request_images: boolean;
    /** 启用函数调用: 允许模型使用函数调用功能; 比如 cursor 借此在回复中读写文件、运行命令 */
    enable_function_calling: boolean;
    /** 启用网络搜索: 允许模型使用网络搜索功能 */
    enable_web_search: boolean;

    /** 是否允许发送图片作为提示词 */
    allow_images: 'disabled' | 'auto' | 'low' | 'high';
    /** 是否允许发送视频作为提示词 */
    allow_videos: boolean;

    /**
     * 角色名称前缀: 是否要为消息添加角色名称前缀, 以及怎么添加
     * - `none`: 不添加
     * - `default`: 为与角色卡不同名的消息添加角色名称前缀, 添加到 `content` 字段开头 (即发送的消息内容是 `角色名: 消息内容`)
     * - `content`: 为所有消息添加角色名称前缀, 添加到 `content` 字段开头 (即发送的消息内容是 `角色名: 消息内容`)
     * - `completion`: 在发送给模型时, 将角色名称写入到 `name` 字段; 仅支持字母数字和下划线, 不适用于 Claude、Google 等模型
     */
    character_name_prefix: 'none' | 'default' | 'content' | 'completion';
    /** 用引号包裹用户消息: 在发送给模型之前, 将所有用户消息用引号包裹 */
    wrap_user_messages_in_quotes: boolean;
  };

  /** 提示词列表里已经添加的提示词 */
  prompts: Prompt[];
  /** 下拉框里没添加进来的提示词 */
  prompts_unused: Prompt[];

  /** 额外字段, 用于为预设绑定额外数据 */
  extensions: Record<string, any>;
}

export type Prompt = Prompt_normal | Prompt_system | Prompt_placeholder;
export interface Prompt_normal {
  id: string;
  enabled: boolean;
  name: string;
  /** 插入位置: `'relative'` 则按提示词相对位置插入, `number` 则插入到聊天记录中的对应深度 */
  position: 'relative' | number;

  role: 'system' | 'user' | 'assistant';
  content: string;

  /** 额外字段, 用于为预设提示词绑定额外数据 */
  extra?: Record<string, any>;
}

/** 预设中的酒馆系统提示词, 但其实相比于手动添加的提示词没有任何优势 */
export interface Prompt_system {
  id: 'main' | 'nsfw' | 'jailbreak' | 'enhanceDefinitions';
  enabled: boolean;
  name: string;

  role: 'system' | 'user' | 'assistant';
  content: string;

  /** 额外字段, 用于为预设提示词绑定额外数据 */
  extra?: Record<string, any>;
}

/** 预设提示词中的占位符提示词, 对应于世界书条目、角色卡、玩家角色、聊天记录等提示词 */
export interface Prompt_placeholder {
  id:
    | 'world_info_before'
    | 'persona_description'
    | 'char_description'
    | 'char_personality'
    | 'scenario'
    | 'world_info_after'
    | 'dialogue_examples'
    | 'chat_history';
  enabled: boolean;
  name: string;
  /** 插入位置: `'relative'` 则按提示词相对位置插入, `number` 则插入到聊天记录中的对应深度 */
  position: 'relative' | number;

  role: 'system' | 'user' | 'assistant';

  /** 额外字段, 用于为预设提示词绑定额外数据 */
  extra?: Record<string, any>;
}
