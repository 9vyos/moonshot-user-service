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
}
