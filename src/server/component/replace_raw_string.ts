export function replace_raw_string(text: string | undefined): string | undefined {
  return text?.replaceAll(/# :(?=.*$)/gm, '');
}
