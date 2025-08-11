export function parse_regex_from_string(input: string): RegExp | null {
  let match = input.match(/^\/([\w\W]+?)\/([gimsuy]*)$/);
  if (!match) {
    return null;
  }

  let [, pattern, flags] = match;

  if (pattern.match(/(^|[^\\])\//)) {
    return null;
  }

  pattern = pattern.replace('\\/', '/');

  try {
    return new RegExp(pattern, flags);
  } catch (e) {
    return null;
  }
}
