import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by');
  app.enableCors();
  app.use(morgan('dev'));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Sistema de Gestión API')
    .setDescription(
      'API para el sistema de gestión de usuarios, productos y empresas',
    )
    .setVersion('1.0')
    .addTag('Authentication', 'Endpoints relacionados con la autenticación')
    .addTag('Users', 'Gestión de usuarios del sistema')
    .addTag('Products', 'Gestión de productos del sistema')
    .addTag('Companies', 'Gestión de empresas')
    .addTag('Departments', 'Gestión de departamentos')
    .addTag('Cities', 'Gestión de ciudades')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingresa tu token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') ?? 3000;
  await app.listen(PORT);
  console.log(`PORT ${PORT}`);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
