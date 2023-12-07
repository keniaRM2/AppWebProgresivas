import bcryptjs from 'bcryptjs';
import { ErrorMessage, TJson } from './types';
require('dotenv').config();

export async function hash(password: string): Promise<string> {
  return await new Promise(async (resolve, reject) => {
    bcryptjs.hash(password, await bcryptjs.genSalt(15), (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

export async function compare(password: string, hashed: string) {
  return await new Promise((resolve, reject) => {
    bcryptjs.compare(password, hashed, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export const validateError = (message: string) => {
  return ErrorMessage[message];
};
