import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class NewUsers {
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
