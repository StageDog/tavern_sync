import { register_preset } from '@client/preset';
import { get_settings } from '@client/settings';
import { register_worldbook } from '@client/worldbook';
import { compare } from 'compare-versions';

$(async () => {
  const version = await getTavernHelperVersion();
  if (compare(version, '3.4.11', '<')) {
    toastr.error('酒馆助手版本过低, 不能使用酒馆同步脚本, 请更新至 3.4.11 或更高版本');
  }
  if (get_settings().notify_for_breaking_change) {
    const result = await SillyTavern.callGenericPopup(
      '<h2>更新提示</h2>同步脚本最近发生了不可通过 <code>node tavern_sync update</code> 更新的变动, 如果你还在用 tavern_sync.js, 请通过<a href="https://gitgud.io/StageDog/tavern_sync/-/raw/main/dist/tavern_sync.mjs?inline=false" target="_blank">下载链接</a>下载 tavern_sync.mjs',
      SillyTavern.POPUP_TYPE.CONFIRM,
      '',
      { okButton: '帮我下载', cancelButton: '我知道了' },
    );
    if (result === SillyTavern.POPUP_RESULT.AFFIRMATIVE) {
      window.open('https://gitgud.io/StageDog/tavern_sync/-/raw/main/dist/tavern_sync.mjs?inline=false', '_blank');
    }
    insertOrAssignVariables({ notify_for_breaking_change: false }, { type: 'script', script_id: getScriptId() });
  }
  register_worldbook();
  register_preset();
});
