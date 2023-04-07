import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInfoResponse } from './dto/response/user.info.response';
import { CreateUserRequest } from './dto/request/create.user.request';
import { UserService } from './user.service';

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
}
