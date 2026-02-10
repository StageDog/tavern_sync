import * as z from 'zod';

export function detailed_parse(schema: z.ZodType<any>, data: any) {
  const result = schema.safeParse(data, { reportInput: true });
  if (!result.success) {
    console.info(result);
    throw Error(z.prettifyError(result.error));
  }
  return result.data;
}
