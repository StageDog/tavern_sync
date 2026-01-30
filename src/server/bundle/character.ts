import { from_tavern_regex } from '@server/bundle/tavern_regex';
import { to_original_worldbook_entry } from '@server/bundle/worldbook';
import { Character } from '@type/character.en';
import { crc32 } from 'crc';
import _ from 'lodash';
import PNGtext from 'png-chunk-text';
import extract from 'png-chunks-extract';

// https://github.com/SillyTavern/SillyTavern/blob/bba43f33219e41de7331b61f6872f5c7227503a3/src/endpoints/characters.js
function to_character_book(name: string, entries: Record<string, any>[]) {
  return {
    name,
    entries: entries.map(entry => ({
      id: entry.uid,
      keys: entry.key,
      secondary_keys: entry.keysecondary,
      comment: entry.comment,
      content: entry.content,
      constant: entry.constant,
      selective: entry.selective,
      insertion_order: entry.order,
      enabled: !entry.disable,
      position: entry.position == 0 ? 'before_char' : 'after_char',
      use_regex: true,
      extensions: {
        ...entry.extensions,
        position: entry.position,
        exclude_recursion: entry.excludeRecursion,
        display_index: entry.displayIndex,
        probability: entry.probability ?? null,
        useProbability: entry.useProbability ?? false,
        depth: entry.depth ?? 4,
        selectiveLogic: entry.selectiveLogic ?? 0,
        outlet_name: entry.outletName ?? '',
        group: entry.group ?? '',
        group_override: entry.groupOverride ?? false,
        group_weight: entry.groupWeight ?? null,
        prevent_recursion: entry.preventRecursion ?? false,
        delay_until_recursion: entry.delayUntilRecursion ?? false,
        scan_depth: entry.scanDepth ?? null,
        match_whole_words: entry.matchWholeWords ?? null,
        use_group_scoring: entry.useGroupScoring ?? false,
        case_sensitive: entry.caseSensitive ?? null,
        automation_id: entry.automationId ?? '',
        role: entry.role ?? 0,
        vectorized: entry.vectorized ?? false,
        sticky: entry.sticky ?? null,
        cooldown: entry.cooldown ?? null,
        delay: entry.delay ?? null,
        match_persona_description: entry.matchPersonaDescription ?? false,
        match_character_description: entry.matchCharacterDescription ?? false,
        match_character_personality: entry.matchCharacterPersonality ?? false,
        match_character_depth_prompt: entry.matchCharacterDepthPrompt ?? false,
        match_scenario: entry.matchScenario ?? false,
        match_creator_notes: entry.matchCreatorNotes ?? false,
        triggers: entry.triggers ?? [],
        ignore_budget: entry.ignoreBudget ?? false,
      },
    })),
  };
}

const ignored_fields = {
  personality: '',
  scenario: '',
  mes_example: '',
  avatar: 'none',
  talkativeness: '0.5',
  fav: false,
  tags: [],
  spec: 'chara_card_v3',
  spec_version: '3.0',
  data: {
    personality: '',
    scenario: '',
    mes_example: '',
    system_prompts: '',
    post_history_instructions: '',
    tags: [],
    extensions: {
      talkativeness: '0.5',
      fav: false,
      depth_prompt: {
        prompt: '',
        depth: 4,
        role: 'system',
      },
    },
    group_only_greetings: [],
  },
} as const;
type _OriginalCharacter = {
  name: string;
  description: string;
  first_mes: string;
  creatorcomment: string;
  data: {
    name: string;
    description: string;
    first_mes: string;
    creator_notes: string;
    creator: string;
    character_version: string;
    alternate_greetings: string[];
    extensions: {
      // TODO: 记录世界书名称
      world: string;
      regex_scripts: Record<string, any>[];
      tavern_helper: Record<string, any>;
    };
    character_book: {
      entries: Record<string, any>[];
      // TODO: 记录世界书名称
      name: string;
    };
  };
  create_date: string;
};

function to_original_character(
  name: string,
  character: Omit<Character, 'avatar'> & { avatar: Buffer },
): _OriginalCharacter {
  return _.merge(
    {
      name,
      description: character.description,
      first_mes: character.first_messages[0].content ?? '',
      creatorcomment: character.creator_notes,
      data: {
        name,
        description: character.description,
        first_mes: character.first_messages[0].content ?? '',
        creator_notes: character.creator_notes,
        creator: character.creator,
        character_version: character.version,
        alternate_greetings: character.first_messages.slice(1).map(message => message.content ?? ''),
        extensions: {
          world: character.worldbook,
          regex_scripts: character.extensions?.regex_scripts?.map((script: any) => from_tavern_regex(script)) ?? [],
          tavern_helper: character.extensions?.tavern_helper ?? {},
          ..._.omit(character.extensions, 'regex_scripts', 'tavern_helper'),
        },
        character_book: to_character_book(
          character.worldbook,
          character.entries.map((entry, index) => to_original_worldbook_entry(entry, index)),
        ),
      },
      create_date: new Date().toISOString(),
    },
    ignored_fields,
  );
}

// https://github.com/SillyTavern/SillyTavern/blob/bba43f33219e41de7331b61f6872f5c7227503a3/src/png/encode.js#L9-L69
export default function encode(chunks: Array<{ name: string; data: Uint8Array }>) {
  const uint8 = new Uint8Array(4);
  const int32 = new Int32Array(uint8.buffer);
  const uint32 = new Uint32Array(uint8.buffer);

  let totalSize = 8;
  let idx = totalSize;

  for (let i = 0; i < chunks.length; i++) {
    totalSize += chunks[i].data.length;
    totalSize += 12;
  }

  const output = new Uint8Array(totalSize);

  output[0] = 0x89;
  output[1] = 0x50;
  output[2] = 0x4e;
  output[3] = 0x47;
  output[4] = 0x0d;
  output[5] = 0x0a;
  output[6] = 0x1a;
  output[7] = 0x0a;

  for (let i = 0; i < chunks.length; i++) {
    const { name, data } = chunks[i];
    const size = data.length;
    const nameChars = [name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)];

    uint32[0] = size;
    output[idx++] = uint8[3];
    output[idx++] = uint8[2];
    output[idx++] = uint8[1];
    output[idx++] = uint8[0];

    output[idx++] = nameChars[0];
    output[idx++] = nameChars[1];
    output[idx++] = nameChars[2];
    output[idx++] = nameChars[3];

    for (let j = 0; j < size; ) {
      output[idx++] = data[j++];
    }

    const crc = crc32(Buffer.from(data), crc32(Buffer.from(nameChars)));

    int32[0] = crc;
    output[idx++] = uint8[3];
    output[idx++] = uint8[2];
    output[idx++] = uint8[1];
    output[idx++] = uint8[0];
  }

  return output;
}

// https://github.com/SillyTavern/SillyTavern/blob/bba43f33219e41de7331b61f6872f5c7227503a3/src/character-card-parser.js#L15
export function write(image: Buffer, data: string) {
  const chunks = extract(new Uint8Array(image));
  const tEXtChunks = chunks.filter(chunk => chunk.name === 'tEXt');

  // Remove existing tEXt chunks
  for (const tEXtChunk of tEXtChunks) {
    const data = PNGtext.decode(tEXtChunk.data);
    if (data.keyword.toLowerCase() === 'chara' || data.keyword.toLowerCase() === 'ccv3') {
      chunks.splice(chunks.indexOf(tEXtChunk), 1);
    }
  }

  // Add new v2 chunk before the IEND chunk
  const base64EncodedData = Buffer.from(data, 'utf8').toString('base64');
  chunks.splice(-1, 0, PNGtext.encode('chara', base64EncodedData));

  // Try adding v3 chunk before the IEND chunk
  try {
    //change v2 format to v3
    const v3Data = JSON.parse(data);
    v3Data.spec = 'chara_card_v3';
    v3Data.spec_version = '3.0';

    const base64EncodedData = Buffer.from(JSON.stringify(v3Data), 'utf8').toString('base64');
    chunks.splice(-1, 0, PNGtext.encode('ccv3', base64EncodedData));
  } catch (error) {
    // Ignore errors when adding v3 chunk
  }

  const newBuffer = Buffer.from(encode(chunks));
  return newBuffer;
}

export function bundle_character(name: string, character: Omit<Character, 'avatar'> & { avatar: Buffer }) {
  const original_character = to_original_character(name, character);
  if (character.avatar) {
    return write(character.avatar, JSON.stringify(original_character));
  }
  return original_character;
}
