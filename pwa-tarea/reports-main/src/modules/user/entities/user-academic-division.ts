import { Entity, TStatus } from '../../../kernel/types';
import { TUser } from './user';
import { TAcademicDivision } from '../../academic-division/academic-division.module.boundary';

export type TUserAcademicDivision = Entity<number> & {
  user: TUser;
  academicDivision: TAcademicDivision;
  createdAt?: string;
  status?: TStatus;
};
