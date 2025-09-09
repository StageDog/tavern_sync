import * as z from 'zod';

export function prettified_parse(schema: z.ZodType<any>, data: any) {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw Error(z.prettifyError(result.error));
  }
  return result.data;
}
