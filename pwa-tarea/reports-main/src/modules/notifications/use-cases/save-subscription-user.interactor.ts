import { Errors } from '../../../kernel/types';
import { UseCase } from '../../../kernel/contract';
import { IUserRepository } from '../../user/use-cases/ports/user.repository';
import { TUser } from '../../user/user.module.boundary';

export class SaveSubscriptionUserInteractor implements UseCase<TUser, boolean> {
  constructor(private readonly repository: IUserRepository) {}
  async execute(payload?: TUser | undefined): Promise<boolean> {
    if (!payload?.id || !payload.userDetails)
      throw Error(Errors.MISSING_FIELDS);
    const userFound = await this.repository.findById(payload.id);
    console.log(userFound);
    if (!userFound) throw Error(Errors.NO_DATA_FOUND);
    if (!userFound.userDetails)
      userFound.userDetails = {
        suscriptions: [payload.userDetails?.suscription],
      };
    else
      userFound.userDetails?.suscriptions.push(payload.userDetails.suscription);
    return await this.repository.subscribe(userFound);
  }
}
