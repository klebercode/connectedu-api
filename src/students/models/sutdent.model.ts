import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Student {
  @Field(type => ID)
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
}
