import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsOptional, isEmail } from 'class-validator';
import { TypeUser } from '../../common/enums/enum-usertoken';

@ObjectType()
export class UserTypeEntity {
  @Field({ nullable: false })
  @IsOptional()
  idUser: number;

  @Field(type => TypeUser, { nullable: false })
  @IsOptional()
  userType?: TypeUser;

  @Field({ nullable: true })
  @IsOptional()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  email: string;
}
