import { exit } from 'node:process';

export function exit_on_error(error: Error | string): never {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }
  exit(1);
}
