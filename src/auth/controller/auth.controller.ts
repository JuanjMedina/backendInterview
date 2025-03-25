import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';
import { ResponseUtil } from 'src/utils/response.util';
import { ApiResponse } from 'src/types/response.interface';
import {
  ApiTags,
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';

class TokenResponse {
  @ApiProperty({
    description: 'Token de acceso JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;
}

class LoginResponse {
  @ApiProperty({
    description: 'Estado de la respuesta',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Datos de la respuesta',
    type: TokenResponse,
  })
  data: TokenResponse;

  @ApiProperty({
    description: 'Mensaje de la respuesta',
    example: 'Login successful',
  })
  message: string;
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user and return access token',
  })
  @ApiBody({ type: AuthDto, description: 'User credentials' })
  @SwaggerApiResponse({
    status: 200,
    description: 'Login successful',
    type: LoginResponse,
  })
  @SwaggerApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
  })
  async login(@Body() authDto: AuthDto): Promise<ApiResponse<any>> {
    const user = await this.authService.validateUser(authDto);
    const token = await this.authService.generateJWT(user);
    return ResponseUtil.success(token, 'Login successful');
  }
}
