import { get_settings } from '@server/settings';

export function replace_user_name(text: string | undefined): string | undefined {
  return text?.replaceAll(get_settings().user_name, '<user>');
}
