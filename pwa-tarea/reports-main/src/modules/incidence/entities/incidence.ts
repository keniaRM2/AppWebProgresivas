import { TUser } from '../../user/user.module.boundary';
import { Entity, TStatus } from '../../../kernel/types';
import { TAnnexe } from './annexe';
import { UserArea } from './user-area';
import { TPerson } from 'modules/user/entities/person';

export type TIncidence = Entity<number> & {
  title: string;
  incidenceDate?: string;
  type?: string;
  description?: string;
  createdAt?: string;
  user?: UserArea;
  person?: TPerson;
  status?: TStatus;
  location?: {
    lat: number;
    lng: number;
  };
  annexes?: Array<TAnnexe>;
};
