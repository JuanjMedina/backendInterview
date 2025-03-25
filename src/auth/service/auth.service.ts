import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../users/entity/user.entity';
import { AuthDto } from '../dto/auth.dto';
import * as jwt from 'jsonwebtoken';
import { ErrorManager } from 'src/utils/errorManager';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async validateUser(authDto: AuthDto) {
    try {
      const { email, password } = authDto;
      console.log('email', email);
      const user = await this.userRepository.findOne({
        where: { email },
      });

      console.log(user);

      if (!user) {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Invalid email or password',
        });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Invalid email or password',
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async generateJWT(user: UserEntity) {
    try {
      const payload = {
        id: user.id,
        name: user.nombre,
        email: user.email,
        companyId: user.companyId,
      };

      const JWT_SECRET = process.env.JWT_SECRET ?? 'secret_key';

      return {
        access_token: jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }),
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
