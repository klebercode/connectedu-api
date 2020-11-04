import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';

@InputType()
export class UpdateUsersInput {
  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  name: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  nickName: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  profile: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @IsOptional()
  email: string;
}
