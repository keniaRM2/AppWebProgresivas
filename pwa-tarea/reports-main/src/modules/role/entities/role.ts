import { Entity, TStatus } from '../../../kernel/types';

export type TRole = Entity<number> & {
  role: string;
  status?: TStatus;
};
