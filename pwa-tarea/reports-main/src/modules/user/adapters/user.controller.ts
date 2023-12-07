import express, { Request, Response } from 'express';
import { UserStorageGateway } from './user.storage.gateway';
import { GetAllUsersInteractor } from '../use-cases/get-all-users.interactor';
import { SaveUserInteractor } from '../use-cases/save-user.interactor';
import { TUser } from '../user.module.boundary';
import { UpdateUserInteractor } from '../use-cases/update-user.interactor';
import { ChangeStatusUSerInteractor } from '../use-cases/change-status-user.interactor';
import { GetKeyPushInteractor } from '../../notifications/use-cases/get-key-push.interactor';

export class UserController {
  static async getAll(req: Request, res: Response) {
    try {
      const repository = new UserStorageGateway();
      const interactor = new GetAllUsersInteractor(repository);
      const users = await interactor.execute();
      res.status(200).json({ users });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error' });
    }
  }
  static async getAllAreasByUser(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const repository = new UserStorageGateway();
      const interactor = new GetAllUsersInteractor(repository);
      const users = await interactor.execute();


      const userFound = users.find(u => u.id === id);

      const areas = userFound?.areas || [];

      res.status(200).json({ areas });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error' });
    }
  }
  static async save(req: Request, res: Response) {
    try {
      const {
        roles,
        username,
        password,
        type,
        status: { id: statusId },
        person: { name, surname, lastname, birthdate, curp, rfc },
      } = req.body;
      const payload: TUser = {
        id: 0,
        username,
        password,
        type,
        status: {
          id: Number(statusId),
        },
        person: {
          name,
          surname,
          lastname,
          birthdate,
          curp,
          rfc,
          id: 0,
        },
        roles,
      };
      const repository = new UserStorageGateway();
      const interactor = new SaveUserInteractor(repository);
      const registered = await interactor.execute(payload);
      res.status(200).json({ registered });
    } catch (error) {
      console.log(error);

      res.status(400).json({ message: 'Error' });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const {
        id,
        roles,
        username,
        password,
        type,
        status: { id: statusId },
        person: { id: personId, name, surname, lastname, birthdate, curp, rfc },
      } = req.body;
      const payload: TUser = {
        id,
        username,
        password,
        type,
        status: {
          id: Number(statusId),
        },
        person: {
          name,
          surname,
          lastname,
          birthdate,
          curp,
          rfc,
          id: personId,
        },
        roles,
      };
      const repository = new UserStorageGateway();
      const interactor = new UpdateUserInteractor(repository);
      const updated = await interactor.execute(payload);
      res.status(200).json({ updated });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error' });
    }
  }
  static async changeStatus(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const repository = new UserStorageGateway();
      const interactor = new ChangeStatusUSerInteractor(repository);
      const updated = await interactor.execute(id ? Number(id) : 0);
      res.status(200).json({ updated });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error' });
    }
  }
}

export const userRouter = express.Router();
userRouter.get('/', [], UserController.getAll);
userRouter.post('/', [], UserController.save);
userRouter.put('/', [], UserController.update);
userRouter.patch('/', [], UserController.changeStatus);

userRouter.post('/areas', [], UserController.getAllAreasByUser);
