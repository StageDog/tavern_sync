export type TavernRegex = {
  id: string;
  script_name: string;
  enabled: boolean;
  run_on_edit: boolean;

  find_regex: string;
  trim_strings: string[];
  replace_string: string;

  source: {
    user_input: boolean;
    ai_output: boolean;
    slash_command: boolean;
    world_info: boolean;
  };

  destination: {
    display: boolean;
    prompt: boolean;
  };

  min_depth: number | null;
  max_depth: number | null;
};
export function from_tavern_regex(tavern_regex: TavernRegex): any {
  return {
    id: tavern_regex.id,
    scriptName: tavern_regex.script_name,
    disabled: !tavern_regex.enabled,
    runOnEdit: tavern_regex.run_on_edit,

    findRegex: tavern_regex.find_regex,
    replaceString: tavern_regex.replace_string,
    trimStrings: tavern_regex.trim_strings,

    placement: [
      ...(tavern_regex.source.user_input ? [1] : []),
      ...(tavern_regex.source.ai_output ? [2] : []),
      ...(tavern_regex.source.slash_command ? [3] : []),
      ...(tavern_regex.source.world_info ? [5] : []),
    ],

    substituteRegex: 0, // TODO: handle this?

    minDepth: tavern_regex.min_depth,
    maxDepth: tavern_regex.max_depth,

    markdownOnly: tavern_regex.destination.display,
    promptOnly: tavern_regex.destination.prompt,
  };
}
