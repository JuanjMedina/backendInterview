import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/guards/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Health check',
    description: 'Verificar que la API está funcionando',
  })
  @ApiResponse({
    status: 200,
    description: 'La API está funcionando correctamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado - Token inválido o expirado',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
