import { Extensions as Extensions_en } from '@type/extensions.en';

export const Extensions = Extensions_en.transform(data => {
  data.regex_scripts.forEach(script => {
    if (script.source.slash_command === false) {
      _.unset(script, 'source.slash_command');
    }
    if (script.source.world_info === false) {
      _.unset(script, 'source.world_info');
    }
    if (script.destination.display || script.destination.prompt) {
      _.unset(script, 'run_on_edit');
    }
    if (!script.min_depth) {
      _.unset(script, 'min_depth');
    }
    if (!script.max_depth) {
      _.unset(script, 'max_depth');
    }
    return script;
  });
  data.tavern_helper.scripts.forEach(script => {
    if (script.type === 'script') {
      if (!script.info.trim()) {
        _.unset(script, 'info');
      }
      if (script.button.buttons.length === 0) {
        _.unset(script, 'button');
      }
      if (_.isEmpty(script.data)) {
        _.unset(script, 'data');
      }
    } else {
      if (!script.icon.trim() || script.icon.trim() === 'fa-solid fa-folder') {
        _.unset(script, 'icon');
      }
      if (script.color.trim() === 'rgba(219, 219, 214, 1)') {
        _.unset(script, 'color');
      }
    }
    return script;
  });
  return data;
});
