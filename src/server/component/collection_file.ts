export function is_collection_file(file: string) {
  return ['合集.yaml', 'collection.yaml'].some(suffix => file.endsWith(suffix));
}

interface Collection_file_entry {
  name: string;
  content: string;
}
export function parse_collection_file(content: string): Collection_file_entry[] {
  return [...content.matchAll(/ *\# \^([^\n]+)\n([\s\S]*?)(?:(?= *\# \^[^\n]+\n)|$)/gs)].map(match => ({
    name: match[1],
    content: match[2],
  }));
}
