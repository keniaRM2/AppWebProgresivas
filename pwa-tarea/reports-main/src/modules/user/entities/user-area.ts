import { Entity, TStatus } from '../../../kernel/types';
import { TUser } from './user';
import { TArea } from '../../area/area.module.boundary';

export type TUserArea = Entity<number> & {
  user: TUser;
  area: TArea;
  createdAt?: string;
  status?: TStatus;
};
