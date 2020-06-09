import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Group {
  @Field(type => ID)
  id: string;

  @Field()
  description: string;

  @Field()
  tipo?: boolean;

  @Field({ name: 'dateBegin', nullable: true })
  date_begin: Date;

  @Field({ name: 'dateEnd', nullable: true })
  date_end?: Date;

  @Field({ name: 'createdAt' })
  created_at: Date;

  @Field({ name: 'updatedAt', nullable: true })
  updated_at: Date;
}
