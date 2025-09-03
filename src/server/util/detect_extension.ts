import { is_yaml } from './is_yaml';

export function detect_extension(content: string) {
  if (is_yaml(content)) {
    return '.yaml';
  }
  return '.txt';
}
