import JWT from 'jsonwebtoken';
import { TUser } from '../modules/user/user.module.boundary';

export const signin = async (payload: TUser) => {
  return JWT.sign(payload, process.env.TOKEN_SECRET!, {
    expiresIn: 60 * 60 * 24 * 7,
  });
};
