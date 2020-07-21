import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class UpdateStudentGradeInput {
  @Field({ nullable: true })
  @IsOptional()
  id?: number;

  @Field({ nullable: false })
  @IsOptional()
  studentId?: number;

  @Field({ nullable: false })
  @IsOptional()
  yearId?: number;

  @Field({ nullable: false })
  @IsOptional()
  subjectId?: number;

  @Field({ nullable: false })
  @MaxLength(1)
  @IsOptional()
  unit?: string; //(1/2/3/4/R/F/E)

  @Field({ nullable: false })
  @MaxLength(1)
  @IsOptional()
  typeUnit?: string; //(1/R)

  @Field({ nullable: false })
  @IsOptional()
  typeGrade?: number;

  @Field({ nullable: true })
  @IsOptional()
  grade?: number;

  @Field({ nullable: true })
  @MaxLength(10)
  @IsOptional()
  concept?: string;
}
