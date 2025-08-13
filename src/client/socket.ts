import { get_settings } from '@client/settings';

import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
export function get_socket(): Socket {
  if (!socket) {
    const settings = get_settings();
    socket = io(settings.url, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.info('[TavernSync] 成功连接至服务器');
    });
    socket.on('connect_error', (error: Error) => {
      console.error(`[TavernSync] 连接服务器出错, 尝试重连! ${error.stack}`);
    });
    socket.on('disconnect', (reason, details) => {
      console.info(`[TavernSync] 与服务器断开连接: ${reason}\n${JSON.stringify(details)}`);
    });
  }
  return socket;
}
