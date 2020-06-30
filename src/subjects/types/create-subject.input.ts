import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreateSubjectInput {
  @Field({ nullable: true })
  @MaxLength(50)
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @MaxLength(15)
  @IsOptional()
  abbreviation?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  descriptionMinutes?: string;

  @Field({ nullable: true })
  @IsOptional()
  status?: boolean;
}
