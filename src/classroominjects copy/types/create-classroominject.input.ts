import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreateClassRoomInjectInput {
  @Field({ nullable: true })
  @IsOptional()
  classroomItemId?: number;

  @Field({ nullable: true })
  @IsOptional()
  subject1Id?: number;

  @Field({ nullable: true })
  @IsOptional()
  subject2Id?: number;

  @Field({ nullable: true })
  @IsOptional()
  subject3Id?: number;

  @Field({ nullable: true })
  @IsOptional()
  subject4Id?: number;

  @Field({ nullable: true })
  @IsOptional()
  average?: number;
}
