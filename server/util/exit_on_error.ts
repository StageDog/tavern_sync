import { exit } from 'node:process';

export function exit_on_error(error: string) {
  console.error(error);
  exit(1);
}
