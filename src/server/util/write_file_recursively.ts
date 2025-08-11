import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

export function write_file_recursively(file: string, data: string) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, data);
}
