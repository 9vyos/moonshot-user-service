import { Field, InputType } from '@nestjs/graphql';
import { UserType } from '../../../domain/user/user.type';

@InputType()
export class CreateUserRequest {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  userType: UserType;

  constructor(email: string, password: string, name: string, userType: UserType) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.userType = userType;
  }

  static testInstance(email, name) {
    return new CreateUserRequest(email, '1234', name, UserType.GUEST);
  }
}
