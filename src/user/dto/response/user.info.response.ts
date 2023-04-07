import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../domain/user/user.entity';

@ObjectType()
export class UserInfoResponse {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  email: string;
  @Field(() => String)
  name: string;

  constructor(id: number, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  static of(user: User) {
    return new UserInfoResponse(user.id, user.email, user.name);
  }
}
