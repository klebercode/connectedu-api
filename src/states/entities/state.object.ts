import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from '../../base-entity';
import { IsOptional } from 'class-validator';

@ObjectType()
@Entity('state')
@Unique(['description'])
export class StateEntity extends BaseEntity {
  @Field()
  @Column({ length: 100, nullable: false })
  description: string;

  @Field()
  @Column({ length: 2, nullable: false })
  uf?: string;
}
