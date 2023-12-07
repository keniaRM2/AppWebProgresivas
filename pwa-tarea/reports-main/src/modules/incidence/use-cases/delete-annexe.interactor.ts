import { UseCase } from '../../../kernel/contract';
import { Errors } from '../../../kernel/types';
import { IIncidenceRepository } from './port/incidence.repository';

export class DeleteAnnexeInteractort implements UseCase<number, boolean> {
  constructor(private readonly reporsitory: IIncidenceRepository) {}
  async execute(payload?: number): Promise<boolean> {
    if (!payload) throw Error(Errors.MISSING_FIELDS);
    return await this.reporsitory.deleteAnnexe(payload);
  }
}
