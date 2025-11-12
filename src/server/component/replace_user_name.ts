import { get_settings } from '@server/settings';

export function replace_user_name(text: string | undefined): string | undefined {
  const user_name = get_settings().user_name;
  if (user_name) {
    return text?.replaceAll(user_name, '<user>');
  }
  return text;
}
