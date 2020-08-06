import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { TypeUser } from '../../common/enums/enum-usertoken';

@InputType()
export class UpdateKeyAccessInput {
  @Field({ nullable: false })
  ownerId: number;

  @Field(type => TypeUser, { nullable: false })
  TypeUser: TypeUser;
}
