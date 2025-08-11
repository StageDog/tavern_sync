import { get_settings } from '@client/settings';
import { get_socket } from '@client/socket';

import { PartialDeep } from 'type-fest';

async function update_worldbook(worldbook_name: string, worldbook: PartialDeep<WorldbookEntry>[]) {
  await createOrReplaceWorldbook(worldbook_name, worldbook);
}
const update_worldbook_debounced = _.debounce(update_worldbook, get_settings().delay);

export function register_worldbook() {
  const socket = get_socket();
  socket.on('pull_worldbook', async (data: { worldbook_name: string }, callback: (data?: WorldbookEntry[]) => void) => {
    console.info(`[TavernSync] 收到提取世界书 '${data.worldbook_name}' 的请求`);
    callback((await getWorldbook(data.worldbook_name)) ?? undefined);
  });
  socket.on(
    'push_worldbook',
    (data: { worldbook_name: string; worldbook: PartialDeep<WorldbookEntry>[] }, callback: () => void) => {
      console.info(`[TavernSync] 收到推送世界书 '${data.worldbook_name}' 的请求`);
      update_worldbook_debounced(data.worldbook_name, data.worldbook);
      callback();
    },
  );
}
