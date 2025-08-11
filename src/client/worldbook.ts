import { get_settings } from '@client/settings';
import { get_socket } from '@client/socket';

import { PartialDeep } from 'type-fest';

async function update_worldbook(name: string, data: PartialDeep<WorldbookEntry>[]) {
  await createOrReplaceWorldbook(name, data);
}
const update_worldbook_debounced = _.debounce(update_worldbook, get_settings().delay);

export function register_worldbook() {
  const socket = get_socket();
  socket.on('pull_worldbook', async (data: { name: string }, callback: (data?: WorldbookEntry[]) => void) => {
    console.info(`[TavernSync] 收到提取世界书 '${data.name}' 的请求`);
    callback((await getWorldbook(data.name)) ?? undefined);
  });
  socket.on('push_worldbook', (data: { name: string; data: PartialDeep<WorldbookEntry>[] }, callback: () => void) => {
    console.info(`[TavernSync] 收到推送世界书 '${data.name}' 的请求`);
    update_worldbook_debounced(data.name, data.data);
    callback();
  });
}
