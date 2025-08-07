import { resolve } from 'node:path';

export interface Pull_options {
  language: 'zh' | 'en';
}

export abstract class Syncer_interface {
  name: string;
  path: string;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = resolve(__dirname, path);
  }

  abstract pull(options: Pull_options): Promise<void>;
  abstract push(): Promise<void>;
  abstract watch(): Promise<void>;
}
