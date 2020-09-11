import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreatContentPlannedInput {
  @Field({ nullable: false })
  @IsOptional()
  yearId?: number;

  @Field({ nullable: false })
  @IsOptional()
  subjectId?: number;

  @Field({ nullable: false })
  @IsOptional()
  classroomId?: number;

  @Field({ nullable: false })
  @IsOptional()
  teacherId?: number;

  @Field({ nullable: true })
  @IsOptional()
  classDouble?: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  date?: Date;

  @Field({ nullable: true })
  @IsOptional()
  content?: string;

  @Field({ nullable: true })
  @IsOptional()
  process?: string;

  @Field({ nullable: true })
  @IsOptional()
  ability?: string;

  @Field({ nullable: true })
  @IsOptional()
  classWork?: string;

  @Field({ nullable: true })
  @IsOptional()
  classHome?: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  legacyCode: string;
}
