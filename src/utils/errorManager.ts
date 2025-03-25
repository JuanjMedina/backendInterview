import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponse } from 'src/types/response.interface';
import { ResponseUtil } from './response.util';

export class ErrorManager extends Error {
  constructor({
    type,
    message,
  }: {
    type: keyof typeof HttpStatus;
    message: string;
  }) {
    super(`${type} :: ${message}`);
  }

  public static createSignatureError(message: string) {
    const name = message.split(' :: ')[0];
    if (name) {
      const status = HttpStatus[name];
      const cleanMessage = message.split(' :: ')[1] || message;
      throw new HttpException(ResponseUtil.error(cleanMessage, status), status);
    }
    throw new HttpException(
      ResponseUtil.error(message),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
