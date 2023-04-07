import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/request/create.user.request';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../domain/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { User } from '../domain/user/user.entity';
import { UserInfoResponse } from './dto/response/user.info.response';
import * as bcrypt from 'bcrypt';
import { UserServiceUtils } from './user.service.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

  async signup(data: CreateUserRequest) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await UserServiceUtils.validateEmail(this.userRepository, data.email);
      const encodedPassword = await bcrypt.hash(data.password, 10);
      const user = await queryRunner.manager
        .getRepository(User)
        .save(User.newUser(data.email, encodedPassword, data.name));
      return UserInfoResponse.of(user);
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
