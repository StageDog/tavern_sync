import dedent from 'dedent';
import _ from 'lodash';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';

async function download_latest(): Promise<string> {
  const urls = [
    'https://raw.githubusercontent.com/StageDog/tavern_sync/refs/heads/main/dist/tavern_sync.mjs',
    'https://cdn.jsdelivr.net/gh/StageDog/tavern_sync/dist/tavern_sync.mjs',
    'https://fastly.jsdelivr.net/gh/StageDog/tavern_sync/dist/tavern_sync.mjs',
    'https://testingcf.jsdelivr.net/gh/StageDog/tavern_sync/dist/tavern_sync.mjs',
  ];

  const erorr_data: Record<string, string> = {};

  const fetches = urls.map(async url => {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
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

export async function check_update_silently(): Promise<void> {
  return check_update()
    .then(result => {
      if (result !== null) {
        console.info(
          dedent(`
          ******************************************************
          发现新版本，请运行 \`node tavern_sync.mjs update\` 更新
          ******************************************************
        `),
        );
      }
    })
    .catch(error => {
      console.error('*************************************************************');
      console.error('检查更新失败，如需手动检查更新，请运行 `node tavern_sync.mjs update`');
      console.error(error instanceof Error ? error.message : String(error));
      console.error('*************************************************************');
    });
}
