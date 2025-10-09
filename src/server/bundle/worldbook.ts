import { Worldbook, Worldbook_entry } from '@type/worldbook.en';
import _ from 'lodash';

const _default_implicit_keys: _ImplicitKeys = {
  addMemo: true,
  matchPersonaDescription: false,
  matchCharacterDescription: false,
  matchCharacterPersonality: false,
  matchCharacterDepthPrompt: false,
  matchScenario: false,
  matchCreatorNotes: false,
  group: '',
  groupOverride: false,
  groupWeight: 100,
  caseSensitive: null,
  matchWholeWords: null,
  useGroupScoring: null,
  automationId: '',
} as const;
type _ImplicitKeys = {
  addMemo: true;
  matchPersonaDescription: false;
  matchCharacterDescription: false;
  matchCharacterPersonality: false;
  matchCharacterDepthPrompt: false;
  matchScenario: false;
  matchCreatorNotes: false;
  group: '';
  groupOverride: false;
  groupWeight: 100;
  caseSensitive: null;
  matchWholeWords: null;
  useGroupScoring: null;
  automationId: '';
};
type _OriginalWorldbookEntry = {
  uid: number;
  displayIndex: number;
  comment: string;
  disable: boolean;

  constant: boolean;
  selective: boolean;
  key: string[];
  selectiveLogic: 0 | 1 | 2 | 3; // 0: and_any, 1: not_all, 2: not_any, 3: and_all
  keysecondary: string[];
  scanDepth: number | null;
  vectorized: boolean;
  position: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  role: 0 | 1 | 2 | null; // 0: system, 1: user, 2: assistant
  depth: number;
  order: number;

  content: string;

  useProbability: boolean;
  probability: number;
  excludeRecursion: boolean;
  preventRecursion: boolean;
  delayUntilRecursion: boolean | number;
  sticky: number | null;
  cooldown: number | null;
  delay: number | null;

  extra?: Record<string, any>;
};
function to_original_worldbook_entry(entry: Worldbook_entry, index: number): _OriginalWorldbookEntry {
  let result = _({})
    .set('uid', index)
    .set('displayIndex', index)
    .set('comment', entry.name)
    .set('disable', !entry.enabled)

    .set('constant', entry.strategy.type === 'constant')
    .set('selective', entry.strategy.type === 'selective')
    .set('key', entry.strategy.keys ?? [])
    .set(
      'selectiveLogic',
      (
        {
          and_any: 0,
          not_all: 1,
          not_any: 2,
          and_all: 3,
        } as const
      )[entry.strategy.keys_secondary?.logic ?? 'and_any'],
    )
    .set('keysecondary', entry.strategy.keys_secondary?.keys ?? [])
    .set('scanDepth', entry.strategy.scan_depth === 'same_as_global' ? null : (entry.strategy.scan_depth ?? null))
    .set('vectorized', entry.strategy.type === 'vectorized')
    .set(
      'position',
      {
        before_character_definition: 0,
        after_character_definition: 1,
        before_example_messages: 5,
        after_example_messages: 6,
        before_author_note: 2,
        after_author_note: 3,
        at_depth: 4,
      }[entry.position.type],
    )
    .set('role', ({ system: 0, user: 1, assistant: 2 } as const)[entry.position?.role ?? 'system'])
    .set('depth', entry.position?.depth ?? 4)
    .set('order', entry.position.order)

    .set('content', entry.content)

    .set('useProbability', true)
    .set('probability', entry.probability ?? 100)
    .set('excludeRecursion', entry.recursion?.prevent_incoming ?? false)
    .set('preventRecursion', entry.recursion?.prevent_outgoing ?? false)
    .set('delayUntilRecursion', entry.recursion?.delay_until ?? false)
    .set('sticky', entry.effect?.sticky ?? null)
    .set('cooldown', entry.effect?.cooldown ?? null)
    .set('delay', entry.effect?.delay ?? null);

  if (entry.extra) {
    result = result.set('extra', entry.extra);
  }

  result = result.merge(_default_implicit_keys as Object).merge(_.pick(entry, Object.keys(_default_implicit_keys)));

  return result.value() as _OriginalWorldbookEntry & _ImplicitKeys;
}

export function bundle_worldbook(worldbook: Worldbook): { entries: Record<number, _OriginalWorldbookEntry> } {
  return {
    entries: Object.fromEntries(
      worldbook.entries.map((entry, index) => [index, to_original_worldbook_entry(entry, index)]),
    ),
  };
}
