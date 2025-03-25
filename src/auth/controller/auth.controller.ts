import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';
import { ResponseUtil } from 'src/utils/response.util';
import { ApiResponse } from 'src/types/response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto): Promise<ApiResponse<any>> {
    const user = await this.authService.validateUser(authDto);
    const token = await this.authService.generateJWT(user);
    return ResponseUtil.success(token, 'Login successful');
  }
}
