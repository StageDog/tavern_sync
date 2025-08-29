import { isAbsolute, relative } from 'path';

export function is_parent(parent_path: string, possible_child_path: string) {
  const result = relative(parent_path, possible_child_path);
  return Boolean(result) && !result.startsWith('..') && !isAbsolute(result);
}
