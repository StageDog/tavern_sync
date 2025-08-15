import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function extract_file_content(base: string, file: string): string | null {
  const resolved_path = resolve(base, file);
  if (!existsSync(resolved_path)) {
    return null;
  }
  return readFileSync(resolved_path, 'utf-8');
}
