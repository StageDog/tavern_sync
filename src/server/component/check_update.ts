import dedent from 'dedent';
import _ from 'lodash';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';

async function download_latest(): Promise<string> {
  const urls = [
    'https://raw.githubusercontent.com/StageDog/tavern_sync/refs/heads/main/dist/tavern_sync.js',
    'https://cdn.jsdelivr.net/gh/StageDog/tavern_sync/dist/tavern_sync.js',
    'https://fastly.jsdelivr.net/gh/StageDog/tavern_sync/dist/tavern_sync.js',
    'https://testingcf.jsdelivr.net/gh/StageDog/tavern_sync/dist/tavern_sync.js',
  ];

  const erorr_data: Record<string, string> = {};

  const controller = new AbortController();
  const timeout_id = _.delay(() => controller.abort(), 5000);

  const fetches = urls.map(async url => {
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (response.ok) {
        return { url, content: await response.text(), error: null };
      } else {
        return { url, content: null, error: `HTTP ${response.status} ${response.statusText}` };
      }
    } catch (error) {
      return { url, content: null, error: (error as Error).message };
    }
  });

  const results = await Promise.all(fetches);
  const [success_results, failed_results] = _.partition(results, result => result.content !== null);
  clearTimeout(timeout_id);

  for (const result of failed_results) {
    _.set(erorr_data, [result.url], result.error);
  }

  if (success_results.length > 0) {
    return _.sortBy(success_results, result => urls.indexOf(result.url))[0].content;
  }

  throw Error(YAML.stringify({ 无法获取最新版脚本: erorr_data }));
}

export async function check_update(): Promise<string | null> {
  const current_content = readFileSync(__filename, 'utf8');
  const remote_content = await download_latest();
  if (current_content === remote_content) {
    return null;
  }
  return remote_content;
}

export function check_update_silently(): number {
  let timeout_id: number;
  const timeout_promise = new Promise<null>(resolve => {
    timeout_id = _.delay(() => resolve(null), 7000);
  });

  Promise.race([check_update(), timeout_promise]).then(result => {
    if (result !== null) {
      console.info(
        dedent(`
          ******************************************************
          发现新版本，请运行 \`node tavern_sync.js update\` 更新
          ******************************************************
        `),
      );
    }
  });

  return timeout_id!;
}
