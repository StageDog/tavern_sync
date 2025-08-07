import * as z from 'zod';

// TODO:
export const Lorebook = z.array(z.object()).min(1);
