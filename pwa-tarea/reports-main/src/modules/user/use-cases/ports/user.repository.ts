import { TUser } from '../../entities/user';

export interface IUserRepository {
  existsById(id: number): Promise<boolean>;
  existsByCurp(curp: string, id?: number): Promise<boolean>;
  existsByRfc(rfc: string, id?: number): Promise<boolean>;
  findAll(): Promise<TUser[]>;
  findById(id: number): Promise<TUser>;
  save(user: TUser): Promise<boolean>;
  update(user: TUser): Promise<boolean>;
  delete(id: number): Promise<boolean>;
  subscribe(user: TUser): Promise<boolean>;
  key(user: TUser): Promise<any>;
}
