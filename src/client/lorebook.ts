import { get_settings } from '@client/settings';
import { get_socket } from '@client/socket';

async function update_lorebook(lorebook: string, entries: Partial<LorebookEntry>[]) {
  const lorebooks = getLorebooks();
  if (!lorebooks.includes(lorebook)) {
    await createLorebook(lorebook);
  }
  await replaceLorebookEntries(lorebook, entries);
}
const update_lorebook_debounced = _.debounce(update_lorebook, get_settings().delay);

export function register_lorebook() {
  const socket = get_socket();
  socket.on('pull_lorebook', async (data: { lorebook: string }, callback: (data?: LorebookEntry[]) => void) => {
    console.info(`[TavernSync] 收到提取世界书 '${data.lorebook}' 的请求`);
    callback((await getLorebookEntries(data.lorebook)) ?? undefined);
  });
  socket.on('push_lorebook', (data: { lorebook: string; entries: Partial<LorebookEntry>[] }, callback: () => void) => {
    console.info(`[TavernSync] 收到推送世界书 '${data.lorebook}' 的请求`);
    update_lorebook_debounced(data.lorebook, data.entries);
    callback();
  });
}
