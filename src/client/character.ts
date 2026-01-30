import { get_settings } from '@client/settings';
import { get_socket } from '@client/socket';
import { Character } from '@server/tavern/character';

async function update_character(name: string, data: Character) {
  let worldbook = RawCharacter.find({ name }) ? getCharWorldbookNames(name).primary : null;
  if (data.entries.length !== 0 || worldbook !== null) {
    worldbook ??= data.worldbook;
    await replaceWorldbook(worldbook, data.entries);
    _.set(data, 'worldbook', worldbook);
  }

  _.set(
    data,
    'first_messages',
    data.first_messages.map(({ content }) => content),
  );
  _.set(data, 'avatar', new Blob([new Uint8Array(data.avatar)], { type: 'application/octet-stream' }));
  _.unset(data, 'anchors');
  _.unset(data, 'entries');
  if (getCharacterNames().includes(name)) {
    await updateCharacterWith(name, character => {
      if (_.isNil(data.extensions)) {
        return { ...data, extensions: character.extensions };
      }
      return data;
    });
  } else {
    await createCharacter(name, data);
  }

  console.info(`[TavernSync] 已推送角色卡 '${name}' 到酒馆`);
  if (get_settings().should_notify) {
    toastr.success(`已推送角色卡 '${name}' 到酒馆`, 'TavernSync');
  }
}

export function register_character() {
  const socket = get_socket();

  socket.on('pull_character', async (data: { name: string }, callback: (data: Character | string) => void) => {
    console.info(`[TavernSync] 收到提取角色卡 '${data.name}' 的请求`);
    try {
      const character = await getCharacter(data.name);
      _.set(character, 'avatar', await fetch(getCharAvatarPath(data.name) as string).then(res => res.blob()));
      _.set(character, 'worldbook', character.worldbook ?? data.name);
      _.set(
        character,
        'entries',
        character.worldbook !== null && getWorldbookNames().includes(character.worldbook)
          ? await getWorldbook(character.worldbook)
          : [],
      );
      if (_.has(character, 'extensions.tavern_helper')) {
        _.update(character, 'extensions.tavern_helper', tavern_helper =>
          Array.isArray(tavern_helper) ? Object.fromEntries(tavern_helper) : tavern_helper,
        );
      }

      console.info(`[TavernSync] 已提取角色卡 '${data.name}' 到本地`);
      if (get_settings().should_notify) {
        toastr.success(`已提取角色卡 '${data.name}' 到本地`, 'TavernSync');
      }
      callback(character as any);
    } catch (err) {
      const error = err as Error;
      console.error(`[TavernSync] 提取角色卡 '${data.name}' 失败: ${error}`);
      if (get_settings().should_notify) {
        toastr.error(`提取角色卡 '${data.name}' 失败: ${error}`, 'TavernSync');
      }
      callback(error.message);
      throw error;
    }
  });

  socket.on('push_character', (data: { name: string; data: Character }, callback: () => void) => {
    console.info(`[TavernSync] 收到推送角色卡 '${data.name}' 的请求`);
    update_character(data.name, data.data);
    callback();
  });
}
