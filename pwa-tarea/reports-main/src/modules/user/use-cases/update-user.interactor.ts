import { UseCase } from '../../../kernel/contract';
import { Errors } from '../../../kernel/types';
import { TUser } from '../entities/user';
import { IUserRepository } from './ports/user.repository';

export class UpdateUserInteractor implements UseCase<TUser, boolean> {
  constructor(private readonly repository: IUserRepository) {}
  async execute(payload: TUser): Promise<boolean> {
    if (
      !payload.password ||
      !payload.username ||
      !payload.roles?.length ||
      !payload.type ||
      !payload.status?.id ||
      !payload.person?.name ||
      !payload.person.surname ||
      !payload.person.birthdate ||
      !payload.person.curp ||
      !payload.person.rfc ||
      !payload.id ||
      !payload.person.id
    )
      throw Error(Errors.MISSING_FIELDS);
    if (
      await this.repository.existsByCurp(payload.person.curp, payload.person.id)
    )
      throw Error(Errors.NO_DATA_FOUND);
    if (
      await this.repository.existsByRfc(payload.person.rfc, payload.person.id)
    )
      throw Error(Errors.NO_DATA_FOUND);
    return await this.repository.update(payload);
  }
}
