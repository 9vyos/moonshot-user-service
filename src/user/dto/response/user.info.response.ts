import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../domain/user/user.entity';
import { UserType } from '../../../domain/user/user.type';

@ObjectType()
export class UserInfoResponse {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  email: string;
  @Field(() => String)
  name: string;
  @Field(() => UserType)
  userType: UserType;

  constructor(id: number, email: string, name: string, userType: UserType) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.userType = userType;
  }

  static of(user: User) {
    return new UserInfoResponse(user.id, user.email, user.name, user.userType);
  }
}
