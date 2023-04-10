import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserRequest {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}
