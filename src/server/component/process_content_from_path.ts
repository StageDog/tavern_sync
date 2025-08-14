import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function process_content_from_path(path: string): string | null {
  const resolved_path = resolve(__dirname, path);
  if (!existsSync(resolved_path)) {
    return null;
  }
  return readFileSync(__dirname, 'utf-8');
}
