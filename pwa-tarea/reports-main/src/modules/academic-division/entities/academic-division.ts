import { Entity, TStatus } from '../../../kernel/types';

export type TAcademicDivision = Entity<number> & {
  name: string;
  abbreviation?: string;
  createdAt?: string;
  status?: TStatus;
};
