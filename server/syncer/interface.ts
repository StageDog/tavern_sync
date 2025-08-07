import { resolve } from 'node:path';

export abstract class Syncer_interface {
  name: string;
  path: string;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = resolve(__dirname, path);
  }

  abstract pull(): Promise<void>;
  abstract push(): Promise<void>;
  abstract watch(): Promise<void>;
}
