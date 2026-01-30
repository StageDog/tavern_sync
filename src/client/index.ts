import { register_character } from '@client/character';
import { register_preset } from '@client/preset';
import { get_settings } from '@client/settings';
import { register_worldbook } from '@client/worldbook';
import { compare } from 'compare-versions';

async function checkMinimumVersion(expected: string, title: string) {
  if (compare(await getTavernHelperVersion(), expected, '<')) {
    toastr.error(`'${title}' 需要酒馆助手版本 >= '${expected}'`, '版本不兼容');
  }
}

$(async () => {
  checkMinimumVersion('4.6.4', '角色卡/世界书/预设同步脚本');

  if (!get_settings().notify_for_character) {
    const result = await SillyTavern.callGenericPopup(
      '<h2>同步脚本支持同步角色卡了</h2>现在, 同步脚本也支持同步角色卡和打包角色卡! 用法与之前相同, 在 tavern_sync.yaml 文件里将<code>配置</code>填成<code>角色卡</code>, <code>酒馆中的名称</code>填成角色卡名称即可',
      SillyTavern.POPUP_TYPE.CONFIRM,
      '',
      { okButton: '查看具体说明', cancelButton: '我知道了' },
    );
    if (result === SillyTavern.POPUP_RESULT.AFFIRMATIVE) {
      window.open('https://stagedog.github.io/青空莉/工具经验/实时编写角色卡、世界书或预设/');
    }
    insertOrAssignVariables({ notify_for_character: true }, { type: 'script', script_id: getScriptId() });
  }
  register_character();
  register_worldbook();
  register_preset();
});
