type Settings = z.infer<typeof Settings>;
const Settings = z.object({
  url: z.string().default('http://localhost:6620'),
  delay: z.number().min(0).default(500),
});

const variable_option = { type: 'script', script_id: getScriptId() } as const;

let settings: Settings;
export function get_settings(): Settings {
  if (!settings) {
    settings = Settings.parse(getVariables(variable_option));
    insertVariables(settings, variable_option);
  }
  return settings;
}
