import { get_settings } from '@client/settings';
import { get_socket } from '@client/socket';
import _ from 'lodash';
async function update_preset(preset_name: string, preset: PromptPreset) {
  await createOrReplacePreset(preset_name, preset);
  if (getLoadedPresetName() === preset_name) {
    console.info(getLoadedPresetName(), preset_name);
    loadPreset(preset_name);
  }
}
const update_preset_debounced = _.debounce(update_preset, get_settings().delay);

export function register_preset() {
  const socket = get_socket();
  socket.on('pull_preset', (data: { preset_name: string }, callback: (data?: PromptPreset) => void) => {
    console.info(`[TavernSync] 收到提取预设 '${data.preset_name}' 的请求`);
    callback(getPreset(getLoadedPresetName() === data.preset_name ? 'in_use' : data.preset_name) ?? undefined);
  });
  socket.on('push_preset', (data: { preset_name: string; preset: PromptPreset }, callback: () => void) => {
    console.info(`[TavernSync] 收到推送预设 '${data.preset_name}' 的请求`);
    update_preset_debounced(data.preset_name, data.preset);
    callback();
  });
}
