import { TUser } from '../../../user/entities/user';
export interface AuthRepository {
  loadUserByUsername(username: string): Promise<TUser>;
}
