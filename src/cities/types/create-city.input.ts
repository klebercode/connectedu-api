import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class CreateCityInput {
  @Field({ nullable: false })
  @MaxLength(100)
  description: string;

  @Field({ nullable: true })
  stateId?: number;
}
