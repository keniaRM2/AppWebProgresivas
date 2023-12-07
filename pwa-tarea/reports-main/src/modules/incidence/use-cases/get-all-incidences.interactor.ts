import { UseCase } from '../../../kernel/contract';
import { TIncidence } from '../entities/incidence';
import { IIncidenceRepository } from './port/incidence.repository';

export class GetAllIncidencesInteractor
  implements UseCase<void, Array<TIncidence>>
{
  constructor(private readonly repository: IIncidenceRepository) {}
  async execute(payload?: void): Promise<TIncidence[]> {
    return await this.repository.findAll();
  }
}
