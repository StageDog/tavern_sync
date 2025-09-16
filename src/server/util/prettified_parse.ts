import * as z from 'zod';

export function detailed_parse(schema: z.ZodType<any>, data: any) {
  const result = schema.safeParse(data, { reportInput: true });
  if (!result.success) {
    throw Error(result.error.message);
  }
  return result.data;
}
