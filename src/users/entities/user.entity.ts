import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/base-entity';

@ObjectType()
@Entity('user')
export class UserEntity extends BaseEntity {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;
}
