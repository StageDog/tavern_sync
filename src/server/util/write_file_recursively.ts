import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

export function write_file_recursively(base: string, file: string, content: string) {
  try {
    mkdirSync(resolve(base, dirname(file)), { recursive: true });
    writeFileSync(resolve(base, file), content);
  } catch (error) {
    throw Error(`写入文件 '${file}' 失败: ${error}`);
  }
}
