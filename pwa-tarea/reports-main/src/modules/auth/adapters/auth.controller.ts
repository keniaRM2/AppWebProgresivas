import express, { Request, Response } from 'express';
import { UserDto } from '../use-cases/dtos/user.dto';
import { AuthStorageGateway } from './auth.storage.gateway';
import { SigninInteractor } from '../use-cases/signin.interactor';
import { validateError } from '../../../kernel/functions';
export class AuthController {
  static async signin(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const paylaod: UserDto = {
        username,
        password,
      };
      const repository = new AuthStorageGateway();
      const interactor = new SigninInteractor(repository);
      const token = await interactor.execute(paylaod);
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      const message = (<Error>error).message;
      const errorApi = validateError(message);
      console.log(errorApi);

      res.status(errorApi.status).json(errorApi);
    }
  }
}

export const authRouter = express.Router();

authRouter.post('/signin', [], AuthController.signin);
