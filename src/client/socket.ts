import { get_settings } from '@client/settings';

import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
export function get_socket(): Socket {
  if (!socket) {
    const settings = get_settings();
    socket = io(settings.url, { retries: 3 });

    socket.on('connect', () => {
      console.info('[TavernSync] 成功连接至服务器');
    });
    socket.on('connect_error', (error: Error) => {
      if (socket!.active) {
        console.warn(`[TavernSync] 连接服务器出错, 尝试重连! ${error.stack}`);
      } else {
        console.error(`[TavernSync] 连接服务器出错, 请手动连接重试! ${error.stack}`);
      }
    });
    socket.on('disconnect', (reason, details) => {
      console.info(`[TavernSync] 与服务器断开连接: ${reason}\n${JSON.stringify(details)}`);
    });
  }
  return socket;
}
