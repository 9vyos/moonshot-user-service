import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 500 })
  password: string;

  @Column({ length: 500 })
  name: string;

  constructor(email: string, password: string, name: string) {
    super();
    this.email = email;
    this.password = password;
    this.name = name;
  }

  static newUser(email: string, encodedPassword: string, name: string) {
    return new User(email, encodedPassword, name);
  }
}
