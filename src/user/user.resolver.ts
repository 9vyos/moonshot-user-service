import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInfoResponse } from './dto/response/user.info.response';
import { CreateUserRequest } from './dto/request/create.user.request';
import { UserService } from './user.service';
import { LoginUserRequest } from './dto/request/login.user.request';
import { UpdateUserRequest } from './dto/request/update.user.request';
import { UserLoginResponse } from './dto/response/user.login.response';
import { UserId } from '../config/decorator/user.id.decorator';
import { UserGuard } from '../config/guard/user.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  hello() {
    return 'hello';
  }

  @Mutation(() => UserInfoResponse)
  async signup(@Args('createUserRequest') request: CreateUserRequest) {
    return await this.userService.signup(request);
  }

  @Mutation(() => UserLoginResponse)
  async login(@Args('loginUserRequest') request: LoginUserRequest) {
    return await this.userService.login(request);
  }

  @Mutation(() => UserInfoResponse)
  @UseGuards(UserGuard)
  async updateUser(@Args('updateUserRequest') request: UpdateUserRequest, @UserId() userId: number) {
    return await this.userService.updateUser(request, userId);
  }

  @Query(() => UserInfoResponse)
  @UseGuards(UserGuard)
  async getUser(@UserId() userId: number) {
    return await this.userService.getUser(userId);
  }
}
