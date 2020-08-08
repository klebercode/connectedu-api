import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, Column, Unique } from 'typeorm';
import { Paginated } from '../../common/pages';

import { BasicFields } from '../../common/types/basicfields';

@ObjectType()
@Entity('state')
@Unique(['description'])
export class StateEntity extends BasicFields {
  @Field()
  @Column({ length: 100, nullable: false })
  description: string;

  @Field()
  @Column({ length: 2, nullable: false })
  uf?: string;
}

@ObjectType()
export class StatePaginated extends Paginated<StateEntity>(StateEntity) {}
