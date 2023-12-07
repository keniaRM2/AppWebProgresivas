import { hash } from '../../../kernel/functions';
import { UseCase } from '../../../kernel/contract';
import { Errors } from '../../../kernel/types';
import { TUser } from '../entities/user';
import { IUserRepository } from './ports/user.repository';

export class SaveUserInteractor implements UseCase<TUser, boolean> {
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
      !payload.person.rfc
    )
      throw Error(Errors.MISSING_FIELDS);
    if (await this.repository.existsByCurp(payload.person.curp))
      throw Error(Errors.ALREADY_EXISTS);
    if (await this.repository.existsByRfc(payload.person.rfc))
      throw Error(Errors.ALREADY_EXISTS);
    payload.password = await hash(payload.password);
    return await this.repository.save(payload);
  }
}
