export interface Settings {
  user名称: string;
  配置: {
    [name: string]: Config;
  };
}
export type Config_type = '世界书' | '预设';
export interface Config {
  类型: Config_type;
  酒馆中的名称: string;
  本地文件路径: string;
}
