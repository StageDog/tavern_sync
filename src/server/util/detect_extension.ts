import { is_json } from '@server/util/is_json';
import { is_yaml } from './is_yaml';

export function detect_extension(content: string) {
  if (is_yaml(content)) {
    return '.yaml';
  }
  if (is_json(content)) {
    return '.json';
  }
  return '.md';
}
