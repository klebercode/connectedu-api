import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserPermissionInput {
  @Field({ nullable: false })
  @IsOptional()
  id?: number;

  @Field({ nullable: false })
  @IsOptional()
  userId?: number;

  @Field({ nullable: false })
  @IsOptional()
  codeId?: number;

  @Field({ nullable: true })
  @IsOptional()
  create?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  edit?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  delete?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  list?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  visible?: boolean;
}
