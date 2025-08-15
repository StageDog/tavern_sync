import chokidar from 'chokidar';

export function watch_on(path: string | string[]) {
  return chokidar.watch(path, {
    awaitWriteFinish: true,
    ignoreInitial: true,
    alwaysStat: true,
    ignored: ['.DS_Store'],
  });
}
