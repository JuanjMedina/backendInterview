import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entity/cities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [],
  providers: [],
})
export class CitiesModule {}
