import { TAcademicDivision } from '../../academic-division/academic-division.module.boundary';
import { Entity, TStatus } from '../../../kernel/types';

export type TArea = Entity<number> & {
  name: string;
  academicDivision?: TAcademicDivision;
  createdAt?: string;
  status?: TStatus;
};
