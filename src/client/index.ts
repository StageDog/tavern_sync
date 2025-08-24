import { register_preset } from '@client/preset';
import { register_worldbook } from '@client/worldbook';
import { compare } from 'compare-versions';

$(async () => {
  const version = await getTavernHelperVersion();
  if (compare(version, '3.4.11', '<')) {
    toastr.error('酒馆助手版本过低, 不能使用酒馆同步脚本, 请更新至 3.4.11 或更高版本');
  }
  register_worldbook();
  register_preset();
});
