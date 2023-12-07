import { Errors } from '../../../kernel/types';
import { UseCase } from '../../../kernel/contract';
import { IUserRepository } from './ports/user.repository';

export class ChangeStatusUSerInteractor implements UseCase<number, boolean> {
  constructor(private readonly repository: IUserRepository) {}
  async execute(payload: number): Promise<boolean> {
    if (!payload) throw Error(Errors.MISSING_FIELDS);
    if (Number.isNaN(payload)) throw Error(Errors.INVALIDFIELDS);
    if (!(await this.repository.existsById(payload)))
      throw Error(Errors.NO_DATA_FOUND);
    return await this.repository.delete(payload);
  }
}
