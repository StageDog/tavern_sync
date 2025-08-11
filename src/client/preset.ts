import { get_settings } from '@client/settings';
import { get_socket } from '@client/socket';

async function update_preset(name: string, data: Preset) {
  await createOrReplacePreset(name, data);
  if (getLoadedPresetName() === name) {
    console.info(getLoadedPresetName(), name);
    loadPreset(name);
  }
}
const update_preset_debounced = _.debounce(update_preset, get_settings().delay);

export function register_preset() {
  const socket = get_socket();
  socket.on('pull_preset', (data: { name: string }, callback: (data: Preset | Error) => void) => {
    console.info(`[TavernSync] 收到提取预设 '${data.name}' 的请求`);
    try {
      callback(getPreset(getLoadedPresetName() === data.name ? 'in_use' : data.name));
    } catch (err) {
      const error = err as Error;
      console.error(`[TavernSync] 提取预设 '${data.name}' 失败: ${error}`);
      callback(error);
    }
  });
  socket.on('push_preset', (data: { name: string; data: Preset }, callback: () => void) => {
    console.info(`[TavernSync] 收到推送预设 '${data.name}' 的请求`);
    update_preset_debounced(data.name, data.data);
    callback();
  });
}
