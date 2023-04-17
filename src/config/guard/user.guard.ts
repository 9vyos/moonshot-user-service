import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { UserService } from '../../user/user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    if (request.headers.user != null) {
      await this.userService.validateUser(request.headers.user);
      return true;
    }
    throw new AuthenticationError('잘못된 유저입니다.');
  }
}
