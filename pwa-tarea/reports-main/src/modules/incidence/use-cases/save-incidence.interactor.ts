import { UseCase } from '../../../kernel/contract';
import { Errors } from '../../../kernel/types';
import { TIncidence } from '../entities/incidence';
import { IIncidenceRepository } from './port/incidence.repository';

export class SaveIncidenceInteractor implements UseCase<TIncidence, boolean> {
  constructor(private readonly repository: IIncidenceRepository) {}
  async execute(payload: TIncidence): Promise<boolean> {
    if (
      !payload?.title ||
      !payload.description ||
      !payload.incidenceDate ||
      !payload.type ||
      !payload.user?.id
    )
      throw Error(Errors.MISSING_FIELDS);
    return await this.repository.save(payload);
  }
}
