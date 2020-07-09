import { Field, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreatStudentCallInput {
  @Field({ nullable: false })
  @IsOptional()
  studentId?: number;

  @Field({ nullable: false })
  @IsOptional()
  subjectId?: number;

  @Field(() => GraphQLISODateTime, { nullable: false })
  @IsOptional()
  date?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @IsOptional()
  time?: Date;

  @Field({ nullable: true })
  @MaxLength(1)
  @IsOptional()
  state?: string; //(P,F)

  @Field({ nullable: true })
  @IsOptional()
  justify?: boolean;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  reason?: string;
}
