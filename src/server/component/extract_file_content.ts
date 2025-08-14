import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

export function extract_file_content(base_file: string, file: string): string | null {
  const resolved_path = resolve(dirname(base_file), file);
  if (!existsSync(resolved_path)) {
    return null;
  }
  return readFileSync(resolved_path, 'utf-8');
}
