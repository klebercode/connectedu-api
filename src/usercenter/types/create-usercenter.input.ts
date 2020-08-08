import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsOptional } from 'class-validator';
import { TypeUser } from '../../common/enums/enum-usertoken';

@InputType()
export class CreateUserCenterInput {
  @Field({ nullable: false })
  @IsOptional()
  idUser: number;

  @Field(type => TypeUser, { nullable: false })
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

  @Field({ nullable: false })
  @IsOptional()
  statusActiveWeb: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  token: string;

  @Field({ nullable: false })
  @IsOptional()
  statusActiveApp: boolean;

  @Field({ nullable: false })
  @IsOptional()
  status: boolean;

  // token usado para primeiro acesso
  @Field({ nullable: false })
  @IsOptional()
  @MaxLength(20)
  keyAcessFirst: string;
}
