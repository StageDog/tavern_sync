import { globSync } from 'node:fs';
import { resolve } from 'node:path';

export function glob_file(base: string, file: string): string[] {
  return globSync(resolve(base, file).replaceAll(/[\[\]\{\}]/g, '[$&]') + '{.*,}');
}
