import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserRequest {
  @Field(() => String)
  @IsNotEmpty()
  name: string;
}
