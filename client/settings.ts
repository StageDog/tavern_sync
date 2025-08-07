interface Settings {
  url: string;
  delay: number;
}
const default_settings: Settings = {
  url: 'http://localhost:6620',
  delay: 1000,
} as const;

const variable_option = { type: 'script', script_id: getScriptId() } as const;

let settings: Settings;
export function get_settings(): Settings {
  if (!settings) {
    insertVariables(default_settings, variable_option);
    settings = _.defaults(default_settings, getVariables(variable_option) as Settings);
  }
  return settings;
}
