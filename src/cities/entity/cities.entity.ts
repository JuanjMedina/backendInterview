import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { City } from '../../cities/types/cites.interface';
import { DepartmentsEntity } from 'src/departments/entity/departments.entity';

@Entity('cities')
export class CityEntity extends BaseEntity implements City {
  @Column()
  nombre: string;
  @Column()
  departamentoId: string;

  @ManyToOne(() => DepartmentsEntity, (departamento) => departamento.ciudades)
  @JoinColumn({ name: 'departamentoId' })
  departamento: DepartmentsEntity;
}
