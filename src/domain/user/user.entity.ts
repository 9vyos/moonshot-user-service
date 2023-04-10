import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { UserType } from './user.type';

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

  @Column({
    type: 'varchar',
    default: UserType.GUEST,
  })
  userType: UserType = UserType.GUEST;

  constructor(email: string, password: string, name: string, userType: UserType) {
    super();
    this.email = email;
    this.password = password;
    this.name = name;
    this.userType = userType;
  }

  static newUser(email: string, encodedPassword: string, name: string, userType: UserType) {
    return new User(email, encodedPassword, name, userType);
  }

  updateName(name: string) {
    this.name = name;
  }
}
