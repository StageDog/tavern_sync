export function is_collection_file(file: string) {
  return ['合集', 'collection'].some(keyword => file.includes(keyword));
}

interface Collection_file_entry {
  name: string;
  content: string;
}
export function parse_collection_file(content: string): Collection_file_entry[] {
  const lines = content.split('\n');
  const entry_anchors = _(lines)
    .map((line, index): { name?: string; line_number: number } | null => {
      const match = line.match(/^ *\# \^(.*)/);
      if (match) {
        return { name: match[1].trimEnd(), line_number: index };
      }
      return null;
    })
    .filter(value => value !== null)
    .push({ name: undefined, line_number: lines.length })
    .value();

  return _(entry_anchors.slice(0, -1))
    .zip(entry_anchors.slice(1))
    .map(([entry_anchor, next_entry_anchor]) => {
      return {
        name: entry_anchor!.name!,
        content: lines.slice(entry_anchor!.line_number + 1, next_entry_anchor!.line_number).join('\n'),
      };
    })
    .value();
}
