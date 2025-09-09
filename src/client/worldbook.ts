import { get_settings } from '@client/settings';
import { get_socket } from '@client/socket';

import { PartialDeep } from 'type-fest';

async function update_worldbook(name: string, data: PartialDeep<WorldbookEntry>[]) {
  await createOrReplaceWorldbook(name, data);
  console.info(`[TavernSync] 已推送世界书 '${name}' 到酒馆`);
  if (get_settings().should_notify) {
    toastr.success(`已推送世界书 '${name}' 到酒馆`, 'TavernSync');
  }
}
const update_worldbook_debounced = _.debounce(update_worldbook, get_settings().delay);

export function register_worldbook() {
  const socket = get_socket();
  socket.on(
    'export_worldbook',
    async (data: { name: string }, callback: (data: Record<string, any> | string) => void) => {
      console.info(`[TavernSync] 收到导出世界书 '${data.name}' 的请求`);
      await update_worldbook_debounced.flush();
      const worldbook = await SillyTavern.loadWorldInfo(data.name);
      if (!worldbook) {
        if (get_settings().should_notify) {
          toastr.error(`世界书 '${data.name}' 不存在`, 'TavernSync');
        }
        callback(`世界书 '${data.name}' 不存在`);
        return;
      }
      callback(_.pick(worldbook, ['entries']));
    },
  );
  socket.on('pull_worldbook', async (data: { name: string }, callback: (data: WorldbookEntry[] | string) => void) => {
    console.info(`[TavernSync] 收到提取世界书 '${data.name}' 的请求`);
    try {
      const worldbook = await getWorldbook(data.name);
      worldbook.forEach(entry => {
        entry.strategy.keys = entry.strategy.keys.map(_.toString);
        entry.strategy.keys_secondary.keys = entry.strategy.keys_secondary.keys.map(_.toString);
      });
      console.info(`[TavernSync] 已提取世界书 '${data.name}' 到本地`);
      if (get_settings().should_notify) {
        toastr.success(`已提取世界书 '${data.name}' 到本地`, 'TavernSync');
      }
      callback(worldbook);
    } catch (err) {
      const error = err as Error;
      console.error(`[TavernSync] 提取世界书 '${data.name}' 失败: ${error}`);
      if (get_settings().should_notify) {
        toastr.error(`提取世界书 '${data.name}' 失败: ${error}`, 'TavernSync');
      }
      callback(error.message);
    }
  });
  socket.on(
    'push_worldbook',
    (data: { name: string; data: { entries: PartialDeep<WorldbookEntry>[] } }, callback: () => void) => {
      console.info(`[TavernSync] 收到推送世界书 '${data.name}' 的请求`);
      update_worldbook_debounced(data.name, data.data.entries);
      callback();
    },
  );
}
