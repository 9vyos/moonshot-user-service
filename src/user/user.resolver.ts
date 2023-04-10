import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInfoResponse } from './dto/response/user.info.response';
import { CreateUserRequest } from './dto/request/create.user.request';
import { UserService } from './user.service';
import { LoginUserRequest } from './dto/request/login.user.request';
import { UpdateUserRequest } from './dto/request/update.user.request';

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

  @Mutation(() => String)
  async login(@Args('loginUserRequest') request: LoginUserRequest) {
    return await this.userService.login(request);
  }

  @Mutation(() => UserInfoResponse)
  async updateUser(@Args('updateUserRequest') request: UpdateUserRequest) {
    return await this.userService.updateUser(request);
  }

  @Query(() => UserInfoResponse)
  async getUser(@Args('id') id: number) {
    return await this.userService.getUser(id);
  }
}
