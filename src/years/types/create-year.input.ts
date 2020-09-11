import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreateYearInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(4)
  year?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateBegin?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateEnd?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateModule1?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateModule2?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateModule3?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  dateModule4?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  legacyCode: string;
}
