import { get_settings } from '@client/settings';
import { get_socket } from '@client/socket';

async function update_preset(name: string, data: Preset) {
  await createOrReplacePreset(name, data);
  if (getLoadedPresetName() === name) {
    console.info(getLoadedPresetName(), name);
    loadPreset(name);
  }
  if (get_settings().should_notify) {
    toastr.success(`已推送预设 '${name}' 到酒馆`, 'TavernSync');
  }
}
const update_preset_debounced = _.debounce(update_preset, get_settings().delay);

export function register_preset() {
  const socket = get_socket();
  socket.on('pull_preset', (data: { name: string }, callback: (data: Preset | string) => void) => {
    console.info(`[TavernSync] 收到提取预设 '${data.name}' 的请求`);
    try {
      const preset = getPreset(getLoadedPresetName() === data.name ? 'in_use' : data.name);
      callback(preset);
      console.info(`[TavernSync] 已提取预设 '${data.name}' 到本地`);
      if (get_settings().should_notify) {
        toastr.success(`已提取预设 '${data.name}' 到本地`, 'TavernSync');
      }
    } catch (err) {
      const error = err as Error;
      console.error(`[TavernSync] 提取预设 '${data.name}' 失败: ${error}`);
      if (get_settings().should_notify) {
        toastr.success(`提取预设 '${data.name}' 失败: ${error}`, 'TavernSync');
      }
      callback(error.message);
    }
  });
  socket.on('push_preset', (data: { name: string; data: Preset }, callback: () => void) => {
    console.info(`[TavernSync] 收到推送预设 '${data.name}' 的请求`);
    update_preset_debounced(data.name, data.data);
    callback();
  });
}
