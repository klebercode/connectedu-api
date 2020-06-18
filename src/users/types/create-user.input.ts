import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateUsersInput {
  @Field({ nullable: false })
  @MaxLength(100)
  name: string;

  @Field({ nullable: false })
  @MaxLength(100)
  email: string;

  @Field({ nullable: false })
  @MaxLength(100)
  password: string;
}
