import z from 'zod';

// TODO: 解析从 tavern 来的 data, 并调整为 Preset_en 可接收的数据; 注意将 prompts_unused 中的占位符提示词移动到 prompts 中
export type Preset = z.infer<typeof Preset>;
export const Preset = z.object({});
