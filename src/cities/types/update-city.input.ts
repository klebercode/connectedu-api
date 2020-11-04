import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class UpdateCityInput {
  @Field({ nullable: true })
  id?: number;

  @Field({ nullable: true })
  @MaxLength(100)
  description: string;

  @Field({ nullable: true })
  @MaxLength(7)
  codeCity: string;

  @Field({ nullable: true })
  stateId?: number;
}
