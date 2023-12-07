import { TArea } from '../../../area/area.module.boundary';
import { TIncidence } from '../../entities/incidence';

export interface IIncidenceRepository {
  existsById(id: number): Promise<boolean>;
  existsByTitle(title: string, id?: number): Promise<boolean>;
  deleteAnnexe(id: number): Promise<boolean>;
  findAll(): Promise<Array<TIncidence>>;
  findAllPending(id?: number): Promise<Array<TIncidence>>;
  findAllAcepted(id?: number): Promise<Array<TIncidence>>;
  findAllByEmployee(id: number): Promise<Array<TIncidence>>;
  findById(id: number): Promise<TIncidence>;
  findAreasByEmployee(id: number): Promise<Array<TArea>>;
  save(incidence: TIncidence): Promise<boolean>;
  update(incidence: TIncidence): Promise<boolean>;
  changeStatus(id: number, status: number): Promise<boolean>;
}
