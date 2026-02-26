import { prettify_error_with_input } from '@server/util/prettify_error_with_input';
import * as z from 'zod';

export function detailed_parse(schema: z.ZodType<any>, data: any) {
  const result = schema.safeParse(data, { reportInput: true });
  if (!result.success) {
    throw Error(prettify_error_with_input(result.error));
  }
  return result.data;
}
