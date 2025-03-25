import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { useToken } from '../utils/useToken';
import { UserService } from 'src/users/service/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    if (!req.headers.authorization)
      throw new UnauthorizedException('Invalid Token');
    let token = req.headers.authorization.split(' ')[1];

    if (!token) throw new UnauthorizedException('Invalid Token');

    const manageToken = useToken(token);

    if (typeof manageToken === 'string')
      throw new UnauthorizedException(manageToken);

    if (manageToken.exExpired === true)
      throw new UnauthorizedException('Token Expired');

    const { sub } = manageToken;

    const user = await this.userService.findOne(sub);
    if (!user) throw new UnauthorizedException('Invalid User');

    req.idUser = sub;
    return true;
  }
}
