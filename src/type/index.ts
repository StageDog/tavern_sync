import { Preset as Preset_en } from '@type/preset.en';
import { Preset as Preset_zh } from '@type/preset.zh';
import { Settings as Settings_en } from '@type/settings.en';
import { Settings as Settings_zh } from '@type/settings.zh';
import { Worldbook as Worldbook_en } from '@type/worldbook.en';
import { Worldbook as Worldbook_zh } from '@type/worldbook.zh';

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as z from 'zod';

function write_json_schema(name: string, schema: z.ZodType) {
  writeFileSync(
    join(__dirname, 'schema', `${name}.json`),
    JSON.stringify(z.toJSONSchema(schema, { io: 'input' }), null, 2),
  );
}

mkdirSync(join(__dirname, 'schema'), { recursive: true });
write_json_schema('preset.en', Preset_en);
write_json_schema('preset.zh', Preset_zh);
write_json_schema('settings.en', Settings_en);
write_json_schema('settings.zh', Settings_zh);
write_json_schema('worldbook.en', Worldbook_en);
write_json_schema('worldbook.zh', Worldbook_zh);
