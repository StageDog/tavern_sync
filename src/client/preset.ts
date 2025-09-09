import { get_settings } from '@client/settings';
import { get_socket } from '@client/socket';

async function update_preset(name: string, data: Preset) {
  await createOrReplacePreset(name, data);
  if (getLoadedPresetName() === name) {
    loadPreset(name);
  }
  console.info(`[TavernSync] 已推送预设 '${name}' 到酒馆`);
  if (get_settings().should_notify) {
    toastr.success(`已推送预设 '${name}' 到酒馆`, 'TavernSync');
  }
}
const update_preset_debounced = _.debounce(update_preset, get_settings().delay);

export function register_preset() {
  const socket = get_socket();
  socket.on('export_preset', async (data: { name: string }, callback: (data: Record<string, any> | string) => void) => {
    console.info(`[TavernSync] 收到导出预设 '${data.name}' 的请求`);
    await update_preset_debounced.flush();
    const preset = SillyTavern.getPresetManager('openai').getCompletionPresetByName(data.name);
    if (preset === undefined) {
      if (get_settings().should_notify) {
        toastr.error(`预设 '${data.name}' 不存在`, 'TavernSync');
      }
      callback(`预设 '${data.name}' 不存在`);
      return;
    }
    callback(
      _.pick(preset, [
        'max_context_unlocked',
        'openai_max_context',
        'openai_max_tokens',
        'n',
        'stream_openai',
        'temp_openai',
        'freq_pen_openai',
        'pres_pen_openai',
        'top_p_openai',
        'repetition_penalty_openai',
        'min_p_openai',
        'top_k_openai',
        'top_a_openai',
        'temperature',
        'frequency_penalty',
        'presence_penalty',
        'top_p',
        'repetition_penalty',
        'min_p',
        'top_k',
        'top_a',
        'seed',
        'squash_system_messages',
        'reasoning_effort',
        'show_thoughts',
        'request_images',
        'function_calling',
        'enable_web_search',
        'image_inlining',
        'inline_image_quality',
        'video_inlining',
        'names_behavior',
        'wrap_in_quotes',
        'prompts',
        'prompt_order',
        'extensions',
      ]),
    );
  });
  socket.on('pull_preset', (data: { name: string; queit: boolean }, callback: (data: Preset | string) => void) => {
    console.info(`[TavernSync] 收到提取预设 '${data.name}' 的请求`);
    try {
      const preset = getPreset(getLoadedPresetName() === data.name ? 'in_use' : data.name);
      callback(preset);
      console.info(`[TavernSync] 已提取预设 '${data.name}' 到本地`);
      if (get_settings().should_notify && !data.queit) {
        toastr.success(`已提取预设 '${data.name}' 到本地`, 'TavernSync');
      }
    } catch (err) {
      const error = err as Error;
      console.error(`[TavernSync] 提取预设 '${data.name}' 失败: ${error}`);
      if (get_settings().should_notify && !data.queit) {
        toastr.error(`提取预设 '${data.name}' 失败: ${error}`, 'TavernSync');
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
