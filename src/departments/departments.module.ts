import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsEntity } from './entity/departments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentsEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class DepartmentsModule {}
