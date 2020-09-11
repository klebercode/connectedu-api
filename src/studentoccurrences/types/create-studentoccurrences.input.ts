import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreatStudentOccurrenceInput {
  @Field({ nullable: true })
  @IsOptional()
  occurrenceId?: number;

  @Field({ nullable: true })
  @IsOptional()
  studentId?: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  date?: Date;

  @Field({ nullable: true })
  @IsOptional()
  subjectId?: number;

  @Field({ nullable: true })
  @IsOptional()
  note?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  legacyCode: string;
}
