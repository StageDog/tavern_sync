import { get_settings } from '@/settings';

export function replace_user_name(text: string): string {
  return text.replace(get_settings().user_name, '<user>');
}
