import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { TypeUser } from '../../common/enums/enum-typeuser';

@InputType()
export class CreateKeyAccessInput {
  @Field({ nullable: false })
  ownerId: number;

  @Field(type => TypeUser, { nullable: false })
  typeUser: TypeUser;
}
