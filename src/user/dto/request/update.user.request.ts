import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateUserRequest {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;
  @Field(() => String)
  @IsNotEmpty()
  name: string;
}
