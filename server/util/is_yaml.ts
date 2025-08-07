import YAML from 'yaml';

export function is_yaml(content: string) {
  try {
    YAML.parse(content);
    return true;
  } catch (error) {
    return false;
  }
}
