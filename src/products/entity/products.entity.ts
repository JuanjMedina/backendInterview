import { BaseEntity } from 'src/config/base.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../types/product.interface';
import { CompanyEntity } from 'src/companies/entity/companies.entity';

@Entity('products')
export class ProductEntity extends BaseEntity implements Product {
  @Column()
  nombre: string;
  @Column()
  descripcion: string;
  @Column()
  precio: number;
  @Column()
  companyId: string;

  @ManyToOne(() => CompanyEntity, (company) => company.productos)
  @JoinColumn({ name: 'companyId' })
  company: CompanyEntity;
}
