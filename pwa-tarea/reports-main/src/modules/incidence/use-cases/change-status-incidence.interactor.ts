import { Errors } from '../../../kernel/types';
import { UseCase } from '../../../kernel/contract';
import { IIncidenceRepository } from './port/incidence.repository';

export class ChangeStatusIncidenceInteractor implements UseCase<any, boolean> {
  constructor(private readonly repository: IIncidenceRepository) {}
  async execute(payload?: any): Promise<boolean> {
    if (!payload.id || !payload.status.id) throw Error(Errors.MISSING_FIELDS);
    return this.repository.changeStatus(payload.id, payload.status.id);
  }
}
