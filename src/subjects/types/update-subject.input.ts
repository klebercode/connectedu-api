import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class UpdateSubjectInput {
  @Field({ nullable: true })
  @IsOptional()
  id?: number;

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

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  legacyCode: string;
}
