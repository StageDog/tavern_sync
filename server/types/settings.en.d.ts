export interface Settings {
  user_name: string;
  configs: {
    [name: string]: Config;
  };
}
export type Config_type = 'lorebook' | 'preset';
export interface Config {
  type: Config_type;
  name: string;
  path: string;
}
