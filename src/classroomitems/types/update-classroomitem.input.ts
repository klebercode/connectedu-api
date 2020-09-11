import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class UpdateClassRoomItemInput {
  @Field({ nullable: true })
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  classroomId?: number;

  @Field({ nullable: true })
  @IsOptional()
  subjectId?: number;

  @Field({ nullable: true })
  @IsOptional()
  teacherId?: number;

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
  @MaxLength(1)
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

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  legacyCode: string;
}
