import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class UpdateUserTokenInput {
  @Field({ nullable: false })
  ownerId: number;

  @Field({ nullable: false })
  @MaxLength(1)
  typeOwer: string;
}
