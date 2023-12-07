import { Entity } from '../../../kernel/types';
import { TArea } from '../../area/area.module.boundary';
import { TUser } from '../../user/user.module.boundary';

export type UserArea = Entity<number> & {
  user?: TUser;
  area?: TArea;
};
