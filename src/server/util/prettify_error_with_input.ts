import _ from 'lodash';
import { ZodError } from 'zod';
import { toDotPath } from 'zod/v4/core';

export function prettify_error_with_input(error: ZodError) {
  return _([...error.issues])
    .sortBy(issue => issue.path?.length ?? 0)
    .flatMap(issue => {
      const lines = [`✖ ${issue.message}`];
      if (issue.path?.length) {
        lines.push(`  → 路径: ${toDotPath(issue.path)}`);
      }
      if (issue.input !== undefined) {
        lines.push(`  → 输入: ${JSON.stringify(issue.input)}`);
      }
      return lines;
    })
    .join('\n');
}
