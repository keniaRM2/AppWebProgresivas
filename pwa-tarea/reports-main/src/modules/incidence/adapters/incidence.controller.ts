import express, { Request, Response } from 'express';
import { validateError } from '../../../kernel/functions';
import { TIncidence } from '../entities/incidence';
import { IncidenceStorageGateway } from './incidence.storage.gateway';
import { GetAllIncidencesByEmployeeInteractor } from '../use-cases/get-all-incidences-by-employee.interactor';
import { GetAllIncidencesInteractor } from '../use-cases/get-all-incidences.interactor';
import { SaveIncidenceInteractor } from '../use-cases/save-incidence.interactor';
import { UpdateIncidenceInteractor } from '../use-cases/update-incidence.interactor';
import { DeleteAnnexeInteractort } from '../use-cases/delete-annexe.interactor';
import { ChangeStatusIncidenceInteractor } from '../use-cases/change-status-incidence.interactor';
import { GetAllIncidencesPendingInteractor } from '../use-cases/get-all-incidences-pending.interactor';
import { GetAllIncidencesAceptedOrAprobedInteractor } from '../use-cases/get-all-incidences-acepted-or-aprobed.interactor';

export class IncidenceController {
  static async getAll(req: Request, res: Response) {
    try {
      const repository = new IncidenceStorageGateway();
      const interactor = new GetAllIncidencesInteractor(repository);
      const incidences = await interactor.execute();
      res.status(200).json({ incidences });
    } catch (error) {
      console.log(error);
      const customError = validateError((<Error>error).message);
      res
        .status(customError['status'])
        .json({ message: customError['message'] });
    }
  }

  static async getAllPending(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const repository = new IncidenceStorageGateway();
      const interactor = new GetAllIncidencesPendingInteractor(repository);
      const incidences = await interactor.execute(id ? Number(id) : 0);
      res.status(200).json({ incidences });
    } catch (error) {
      console.log(error);
      const customError = validateError((<Error>error).message);
      res
        .status(customError['status'])
        .json({ message: customError['message'] });
    }
  }

  static async getAllAceptedOrAprobed(req: Request, res: Response) {
    try {
      console.log(req.params);
      const repository = new IncidenceStorageGateway();
      const interactor = new GetAllIncidencesAceptedOrAprobedInteractor(
        repository
      );
      const incidences = await interactor.execute();
      res.status(200).json({ incidences });
    } catch (error) {
      console.log(error);
      const customError = validateError((<Error>error).message);
      res
        .status(customError['status'])
        .json({ message: customError['message'] });
    }
  }

  static async getAllByEmployee(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(id);

      const repository = new IncidenceStorageGateway();
      const interactor = new GetAllIncidencesByEmployeeInteractor(repository);
      const incidences = await interactor.execute(id ? Number(id) : 0);
      res.status(200).json({ incidences });
    } catch (error) {
      console.log(error);
      const customError = validateError((<Error>error).message);
      res
        .status(customError['status'])
        .json({ message: customError['message'] });
    }
  }

  static async save(req: Request, res: Response) {
    try {
      const {
        title,
        type,
        description,
        incidenceDate,
        userId,
        annexes,
        location,
      } = req.body;
      const payload: TIncidence = {
        id: 0,
        title,
        type,
        description,
        incidenceDate,
        user: {
          id: userId as number,
        },
        annexes,
        location,
      };
      const repository = new IncidenceStorageGateway();
      const interactor = new SaveIncidenceInteractor(repository);
      const registered = await interactor.execute(payload);
      res.status(200).json({ registered });
    } catch (error) {
      console.log(error);
      const customError = validateError((<Error>error).message);
      res
        .status(customError['status'])
        .json({ message: customError['message'] });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { title, type, description, incidenceDate, annexes, id } = req.body;
      const payload: TIncidence = {
        id,
        title,
        type,
        description,
        incidenceDate,
        annexes,
      };
      const repository = new IncidenceStorageGateway();
      const interactor = new UpdateIncidenceInteractor(repository);
      const updated = await interactor.execute(payload);
      res.status(200).json({ updated });
    } catch (error) {
      console.log(error);
      const customError = validateError((<Error>error).message);
      res
        .status(customError['status'])
        .json({ message: customError['message'] });
    }
  }

  static async deleteAnnexe(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const repository = new IncidenceStorageGateway();
      const interactor = new DeleteAnnexeInteractort(repository);
      const deleted = await interactor.execute(id ? Number(id) : 0);
      res.status(200).json({ deleted });
    } catch (error) {
      console.log(error);
      const customError = validateError((<Error>error).message);
      res
        .status(customError['status'])
        .json({ message: customError['message'] });
    }
  }
  static async changeStatus(req: Request, res: Response) {
    try {
      const { id, status } = req.body;
      const payload = {
        id,
        status,
      };
      const repository = new IncidenceStorageGateway();
      const interactor = new ChangeStatusIncidenceInteractor(repository);
      const changed = await interactor.execute(payload);
      res.status(200).json({ changed });
    } catch (error) {
      console.log(error);
      const customError = validateError((<Error>error).message);
      res
        .status(customError['status'])
        .json({ message: customError['message'] });
    }
  }
}

export const incidencesRouter = express.Router();

incidencesRouter.get(`/`, [], IncidenceController.getAll);
incidencesRouter.get(`/pending/:id`, [], IncidenceController.getAllPending);
incidencesRouter.get(
  `/acepted:id`,
  [],
  IncidenceController.getAllAceptedOrAprobed
);
incidencesRouter.get(`/:id`, [], IncidenceController.getAllByEmployee);
incidencesRouter.post(`/save`, [], IncidenceController.save);
incidencesRouter.put(`/update`, [], IncidenceController.update);
incidencesRouter.post(`/status`, [], IncidenceController.changeStatus);
incidencesRouter.post(`/remove-annexe`, [], IncidenceController.deleteAnnexe);
