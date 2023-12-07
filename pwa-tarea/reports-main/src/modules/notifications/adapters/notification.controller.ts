import express, { Request, Response } from 'express';
import { GetKeyPushInteractor } from '../use-cases/get-key-push.interactor';
import { UserStorageGateway } from '../../user/adapters/user.storage.gateway';
import { SaveSubscriptionUserInteractor } from '../use-cases/save-subscription-user.interactor';
import { TUser } from '../../user/user.module.boundary';

export class NotificationController {
  static async getKey(req: Request, res: Response) {
    try {
      const interactor = new GetKeyPushInteractor();
      const publicKey = await interactor.execute();
      res.status(200).send(publicKey);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error' });
    }
  }
  static async subscribeUser(req: Request, res: Response) {
    try {
      const { id, userDetails } = req.body;
      const payload: TUser = {
        username: '',
        id,
        userDetails,
      };
      const repository = new UserStorageGateway();
      const interactor = new SaveSubscriptionUserInteractor(repository);
      const updated = await interactor.execute(payload);
      res.status(200).json({ updated });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: 'Error' });
    }
  }
}

export const notificationRouter = express.Router();

notificationRouter.get(`/`, NotificationController.getKey);
notificationRouter.post(`/`, NotificationController.subscribeUser);
