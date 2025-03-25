import { Column, Entity, OneToMany } from 'typeorm';
import { Departments } from '../types/departments.interface';
import { BaseEntity } from 'src/config/base.entity';
import { CityEntity } from 'src/cities/entity/cities.entity';

@Entity('departments')
export class DepartmentsEntity extends BaseEntity implements Departments {
  @Column()
  nombre: string;

  @OneToMany(() => CityEntity, (city) => city.departamento)
  ciudades: CityEntity[];
}
