import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from 'src/types/response.interface';

export class ResponseUtil {
  static success<T>(
    data: T | T[],
    message = 'Operation completed successfully',
  ): ApiResponse<T> {
    const information = Array.isArray(data) ? data : data ? [data] : [];
    return {
      success: true,
      information,
      message,
      status: HttpStatus.OK,
    };
  }

  static error<T>(
    message: string,
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ): ApiResponse<T> {
    return {
      success: false,
      information: [],
      message,
      status,
    };
  }

  static notFound<T>(entity: string): ApiResponse<T> {
    return this.error<T>(`${entity} not found`, HttpStatus.NOT_FOUND);
  }

  static badRequest<T>(message: string): ApiResponse<T> {
    return this.error<T>(message, HttpStatus.BAD_REQUEST);
  }

  static forbidden<T>(message = 'Forbidden'): ApiResponse<T> {
    return this.error<T>(message, HttpStatus.FORBIDDEN);
  }

  static unauthorized<T>(message = 'Unauthorized'): ApiResponse<T> {
    return this.error<T>(message, HttpStatus.UNAUTHORIZED);
  }
}
