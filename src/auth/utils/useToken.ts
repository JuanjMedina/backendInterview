import * as jwt from 'jsonwebtoken';
import { AuthTokenResult, IUseToken } from '../types/auth.types';

export const useToken = (token: string): IUseToken => {
  try {
    const decode = jwt.decode(token) as AuthTokenResult;
    const currentDate = new Date();
    const expiresDate = new Date(decode.exp);
    const exExpired = +expiresDate <= +currentDate / 1000;
    return { exExpired: exExpired, sub: decode.id };
  } catch (error) {
    return { exExpired: true, sub: '' };
  }
};
