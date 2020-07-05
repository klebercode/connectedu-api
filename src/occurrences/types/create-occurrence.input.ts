import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class CreateOccurrenceInput {
  @Field({ nullable: true })
  @MaxLength(60)
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  status?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  type?: number;

  @Field({ nullable: true })
  @IsOptional()
  points?: number;
}
