import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class CreateOrganizationInput {
  @Field({ nullable: true })
  @MaxLength(100)
  description: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateBegin?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateEnd?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  legacyCode: string;
}
