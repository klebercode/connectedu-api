import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { TypeUser } from '../../common/enums/enum-usertoken';

@ObjectType()
export class AcessFirstObject {
  @Field({ nullable: false })
  ownerId: number;

  @Field({ nullable: false })
  customer: string;

  @Field(type => TypeUser, { nullable: false })
  TypeUser: TypeUser;
}
