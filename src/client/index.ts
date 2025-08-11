import { register_worldbook } from '@client/worldbook';
import { register_preset } from '@client/preset';
import { compare } from 'compare-versions';

$(async () => {
  const version = await getTavernHelperVersion();
  if (compare(version, '3.4.0', '<')) {
  //   throw new Error('酒馆助手版本过低, 不能使用酒馆同步脚本, 请更新至 3.4.0 或更高版本');
  }
  register_worldbook();
  register_preset();
});
