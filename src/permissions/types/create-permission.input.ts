import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class CreatePermissionInput {
  @Field({ nullable: false })
  @MaxLength(6)
  code: string;

  @Field({ nullable: false })
  @MaxLength(100)
  description: string;

  @Field({ nullable: false })
  @MaxLength(3)
  type: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  legacyCode: string;
}
