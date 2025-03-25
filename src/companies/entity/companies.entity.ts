import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Company } from '../types/companies.interface';
import { CityEntity } from 'src/cities/entity/cities.entity';
import { DepartmentsEntity } from 'src/departments/entity/departments.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { ProductEntity } from 'src/products/entity/products.entity';

@Entity('companies')
export class CompanyEntity extends BaseEntity implements Company {
  @Column()
  nombre: string;
  @Column()
  direccion: string;
  @Column()
  ciudadId: string;
  @Column()
  departamentoId: string;

  @ManyToOne(() => CityEntity)
  @JoinColumn({ name: 'ciudadId' })
  ciudad: CityEntity;

  @ManyToOne(() => DepartmentsEntity)
  @JoinColumn({ name: 'departamentoId' })
  departamento: DepartmentsEntity;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.company)
  usuarios: UserEntity[];

  @OneToMany(() => ProductEntity, (product: ProductEntity) => product.company)
  productos: ProductEntity[];
}
