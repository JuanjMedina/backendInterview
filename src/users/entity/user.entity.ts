import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';
import { User } from '../types/user.interface';

@Entity('users')
export class UserEntity extends BaseEntity implements User {
  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
