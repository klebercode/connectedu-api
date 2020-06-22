import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class CreateStateInput {
  @Field({ nullable: false })
  @MaxLength(100)
  description: string;

  @Field({ nullable: false })
  @MaxLength(2)
  uf?: string;
}
