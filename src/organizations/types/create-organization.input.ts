import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class CreateOrganizationInput {
  @Field({ nullable: false })
  @MaxLength(100)
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  dateBegin?: Date;

  @Field({ nullable: true })
  @IsOptional()
  dateEnd?: Date;
}
