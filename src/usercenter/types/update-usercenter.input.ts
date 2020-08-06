import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';
import { TypeUser } from '../../common/enums/enum-usertoken';

@InputType()
export class UpdateUserCenterInput {
  @Field({ nullable: true })
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsOptional()
  idUser: number;

  @Field(type => TypeUser, { nullable: true })
  @IsOptional()
  userType?: TypeUser;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(40)
  login: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(100)
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(40)
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  statusActiveWeb: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  tokenApp: string;

  @Field({ nullable: true })
  @IsOptional()
  statusActiveApp: boolean;

  // token usado para primeiro acesso
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  keyAcessFirst: string;
}
