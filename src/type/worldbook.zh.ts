import * as z from 'zod';

export type Worldbook = z.infer<typeof Worldbook>;
export const Worldbook = z.array(z.object()).min(1);
