import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function process_content_from_file(file: string): string | null {
  // TODO: 不应该是 __dirname
  const resolved_path = resolve(__dirname, file);
  if (!existsSync(resolved_path)) {
    return null;
  }
  return readFileSync(__dirname, 'utf-8');
}
