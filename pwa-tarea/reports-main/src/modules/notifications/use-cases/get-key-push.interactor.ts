import { UseCase } from '../../../kernel/contract';
import { TUser } from '../../user/user.module.boundary';
import vapids from '../../../config/vapid.json';
import UrlsafeBase64 from 'urlsafe-base64';

//PUSH NOTIFICATION KEY
export class GetKeyPushInteractor implements UseCase<TUser, Buffer> {
  constructor() {}
  async execute(): Promise<Buffer> {
    const base64Key = UrlsafeBase64.decode(vapids.publicKey);
    return base64Key;
  }
}
