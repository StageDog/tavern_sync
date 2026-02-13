import { readFileSync } from 'node:fs';

export function extract_file_content(path: string): string {
  return readFileSync(path, 'utf-8').replaceAll('\r\n', '\n');
}
