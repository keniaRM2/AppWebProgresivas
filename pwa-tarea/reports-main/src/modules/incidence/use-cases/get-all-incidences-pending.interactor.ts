import { Errors } from '../../../kernel/types';
import { UseCase } from '../../../kernel/contract';
import { TIncidence } from '../entities/incidence';
import { IIncidenceRepository } from './port/incidence.repository';

export class GetAllIncidencesPendingInteractor
  implements UseCase<number, Array<TIncidence>>
{
  constructor(private readonly repository: IIncidenceRepository) {}
  async execute(payload?: number): Promise<TIncidence[]> {
    if (!payload) throw Error(Errors.MISSING_FIELDS);
    return await this.repository.findAllPending(payload);
  }
}
