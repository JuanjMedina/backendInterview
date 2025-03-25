import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { User } from '../types/user.interface';
import { CompanyEntity } from 'src/companies/entity/companies.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements User {
  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  companyId: string;

  @ManyToOne(() => CompanyEntity, (company) => company.usuarios)
  @JoinColumn({ name: 'companyId' })
  company: CompanyEntity;
}
