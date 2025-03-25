import { IsNotEmpty, IsString } from 'class-validator';
import { IsEmail } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
