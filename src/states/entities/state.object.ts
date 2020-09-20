import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, Column, Unique } from 'typeorm';
import { Paginated } from '../../common/pages';
import { BasicFields } from '../../common/types/basicfields';

@ObjectType()
@Entity('state')
@Unique(['description'])
export class StateEntity extends BasicFields {
  @Field({ nullable: true })
  @Column({ length: 100, nullable: false })
  description: string;

  @Field({ nullable: true })
  @Column({ length: 2, nullable: false })
  uf?: string;

  @Field({ nullable: true })
  @Column({ name: 'code_state', length: 2, nullable: true })
  codeState: string;
}

@ObjectType()
export class StatePaginated extends Paginated<StateEntity>(StateEntity) {}
