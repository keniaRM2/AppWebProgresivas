import { UseCase } from '../../../kernel/contract';
import { AuthRepository } from './port/auth.repository';
import { UserDto } from './dtos/user.dto';
import { Errors } from '../../../kernel/types';
import { compare } from '../../../kernel/functions';
import { signin } from '../../../kernel/jwt';

export class SigninInteractor implements UseCase<UserDto, string> {
  constructor(private readonly repository: AuthRepository) {}
  async execute(payload: UserDto): Promise<string> {
    if (!payload?.username || !payload?.password)
      throw Error(Errors.MISSING_FIELDS);
    const user = await this.repository.loadUserByUsername(payload.username);
    if (!user.username || !user.password) throw Error(Errors.NO_DATA_FOUND);
    // if (!(await compare(payload.password, user.password)))
    //   throw Error(Errors.CREDENTIALS_MISMATCH);
    user.password = undefined;
    return await signin(user);
  }
}
