import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserRequest {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  name: string;
}
