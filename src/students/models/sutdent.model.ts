import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Student {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  endereco?: string;

  @Field({ nullable: true })
  bairro?: string;

  @Field({ nullable: true })
  cidade?: string;

  @Field({ name: 'createdAt' })
  created_at: Date;

  @Field({ name: 'updatedAt', nullable: true })
  updated_at: Date;

  @Field({ nullable: true })
  usercreatedId: number;

  @Field({ nullable: true })
  userupdatedId: number;

  @Field(type => User, { nullable: true })
  usercreated: User;

  @Field(type => User, { nullable: true })
  userupdated: User;
  image: string;
}
