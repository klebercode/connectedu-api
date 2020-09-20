import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class UpdateStateInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  @MaxLength(100)
  description: string;

  @Field({ nullable: true })
  @MaxLength(2)
  uf?: string;

  @Field({ nullable: true })
  @MaxLength(2)
  codeState: string;
}
