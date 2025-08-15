import { exit } from 'node:process';

export function exit_on_error(error: string): never {
  console.error(error);
  exit(1);
}
