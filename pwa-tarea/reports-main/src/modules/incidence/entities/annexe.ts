import { Entity } from '../../../kernel/types';

export type TAnnexe = Entity<number> & {
  name: string;
  mimeType?: string;
  file?: string;
};
