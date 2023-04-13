import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserLoginResponse {
  @Field(() => Number)
  userId: number;
  @Field(() => String)
  jwtToken: string;

  constructor(userId: number, jwtToken: string) {
    this.userId = userId;
    this.jwtToken = jwtToken;
  }

  static of(userId: number, jwtToken: string) {
    return new UserLoginResponse(userId, jwtToken);
  }
}
