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
import { LoginUserRequest } from './dto/request/login.user.request';
import { UpdateUserRequest } from './dto/request/update.user.request';
import { UserLoginResponse } from './dto/response/user.login.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private dataSource: DataSource,
  ) {}

  async signup(request: CreateUserRequest) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await UserServiceUtils.validateEmail(this.userRepository, request.email);
      const encodedPassword = await bcrypt.hash(request.password, 10);
      const user = await queryRunner.manager
        .getRepository(User)
        .save(User.newUser(request.email, encodedPassword, request.name, request.userType));
      await queryRunner.commitTransaction();
      return UserInfoResponse.of(user);
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async login(request: LoginUserRequest) {
    const user = await UserServiceUtils.findUserByEmail(this.userRepository, request.email);
    const jwtToken = await this.jwtService.signAsync({ id: user.id });
    return UserLoginResponse.of(user.id, jwtToken);
  }

  async getUser(id: number) {
    const user = await UserServiceUtils.findUserById(this.userRepository, id);
    return UserInfoResponse.of(user);
  }

  async updateUser(request: UpdateUserRequest, userId) {
    const user = await UserServiceUtils.findUserById(this.userRepository, userId);
    user.updateName(request.name);
    await this.userRepository.save(user);
    return UserInfoResponse.of(user);
  }

  async validateUser(user) {
    return await UserServiceUtils.findUserById(this.userRepository, user.id);
  }
}
