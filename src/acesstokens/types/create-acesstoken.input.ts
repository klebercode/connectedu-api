import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { TypeUser } from '../../common/enums/enum-usertoken';

@InputType()
export class CreateAcessTokenInput {
  @Field({ nullable: false })
  ownerId: number;

  @Field(type => TypeUser, { nullable: false })
  typeUser: TypeUser;
}
