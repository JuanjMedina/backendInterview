import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { ProductsModule } from './products/products.module';
import { DepartmentsModule } from './departments/departments.module';
import { CitiesModule } from './cities/cities.module';
import { AuthModule } from './auth/auth.module';

const envFilePath =
  process.env.NODE_ENV?.trim() === 'development'
    ? '.env.development'
    : '.env.production';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),

    UsersModule,
    CompaniesModule,

    AuthModule,

    ProductsModule,
    DepartmentsModule,
    CitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
