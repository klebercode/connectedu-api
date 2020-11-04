import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsOptional, IsEmail, MaxLength } from 'class-validator';

@InputType()
export class MigrationsClassromitemsInput {
  @Field({ nullable: true })
  @IsOptional()
  classroomLegacyCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  subjectLegacyCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  teacherLegacyCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  workHours?: number;

  @Field({ nullable: true })
  @IsOptional()
  visibleReport?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  visibleMinute?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  registerCall?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  registerContent?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  registerOccurrence?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  type?: string;

  @Field({ nullable: true })
  @IsOptional()
  numberGrades?: number;

  @Field({ nullable: true })
  @IsOptional()
  gradeMin?: number;

  @Field({ nullable: true })
  @IsOptional()
  gradeMax?: number;

  @Field({ nullable: true })
  @IsOptional()
  order?: number;
}
