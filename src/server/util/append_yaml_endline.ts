import { is_yaml } from './is_yaml';

export function append_yaml_endline(content: string) {
  return is_yaml(content) ? content.replace(/(\n)*$/s, '\n') : content;
}
