import { createServer } from 'node:http';
import { exit } from 'node:process';
import { Server, Socket } from 'socket.io';

const port = 6620;

let io: Server | null = null;

export async function wait_socket(): Promise<Socket> {
  if (!io) {
    const server = createServer();
    server.listen(port, () => {
      console.info(
        `酒馆同步脚本服务器正运行在端口: ${port}, 请打开酒馆网页, 等待脚本连接... (如果等待时间超过 10 秒, 请刷新酒馆网页或检查酒馆助手脚本库里的脚本是否开启)`,
      );
    });

    io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    io.on('connect', socket => {
      console.info(`服务器成功连接到酒馆网页 '${socket.id}'`);
      socket.on('disconnect', reason => {
        console.info(`服务器与酒馆网页 '${socket.id}' 断开连接: ${reason}`);
      });
    });
  }

  if (io.sockets.sockets.size > 0) {
    if (io.sockets.sockets.size > 1) {
      console.warn('目前连接到了多个酒馆网页, 为了保证数据同步, 请只打开、连接一个酒馆页面');
    }
    return io.sockets.sockets.values().next().value as Socket;
  }

  return new Promise<Socket>(resolve => {
    io!.once('connect', (socket: Socket) => {
      if (io!.sockets.sockets.size > 1) {
        console.warn('目前连接到了多个酒馆网页, 为了保证数据同步, 请只打开、连接一个酒馆页面');
      }
      resolve(socket);
    });
  });
}

export async function close_server() {
  await io?.close();
  exit(0);
}
