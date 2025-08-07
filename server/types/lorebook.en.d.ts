export type Lorebook = Lorebook_entry[];

export interface Lorebook_entry {
  /** uid 是相对于世界书内部的, 不要跨世界书使用 */
  uid: number;
  /** 酒馆中将排序设置为 "自定义" 时的显示顺序 */
  display_index: number;

  comment: string;
  enabled: boolean;
  type: 'constant' | 'selective' | 'vectorized';
  position:
    | 'before_character_definition'
    | 'after_character_definition'
    | 'before_example_messages'
    | 'after_example_messages'
    | 'before_author_note'
    | 'after_author_note'
    | 'at_depth_as_system'
    | 'at_depth_as_assistant'
    | 'at_depth_as_user';

  /** 仅对于 `position === 'at_depth_as_???'` 有意义; 其他情况为 null */
  depth: number | null;
  order: number;
  probability: number;

  keys: string[];
  logic: 'and_any' | 'and_all' | 'not_all' | 'not_any';
  filters: string[];

  scan_depth: 'same_as_global' | number;
  case_sensitive: 'same_as_global' | boolean;
  match_whole_words: 'same_as_global' | boolean;
  use_group_scoring: 'same_as_global' | boolean;
  automation_id: string | null;

  exclude_recursion: boolean;
  prevent_recursion: boolean;
  /** 启用则是 true, 如果设置了具体的 Recursion Level 则是数字 (具体参考酒馆中勾选这个选项后的变化) */
  delay_until_recursion: boolean | number;

  content: string;

  group: string;
  group_prioritized: boolean;
  group_weight: number;
  sticky: number | null;
  cooldown: number | null;
  delay: number | null;
}
