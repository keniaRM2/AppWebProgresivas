import { Errors } from '../../../kernel/types';
import { UseCase } from '../../../kernel/contract';
import { TIncidence } from '../entities/incidence';
import { IIncidenceRepository } from './port/incidence.repository';

export class GetAllIncidencesByEmployeeInteractor
  implements UseCase<number, Array<TIncidence>>
{
  constructor(private readonly repository: IIncidenceRepository) {}
  async execute(payload: number): Promise<TIncidence[]> {
    if (!payload) throw Error(Errors.MISSING_FIELDS);
    if (Number.isNaN(payload)) throw Error(Errors.INVALIDFIELDS);
    return await this.repository.findAllByEmployee(payload);
  }
}
