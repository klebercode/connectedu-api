import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, Column, Unique } from 'typeorm';
import { BaseEntity } from '../../base-entity';
import { IsOptional } from 'class-validator';

@ObjectType()
@Entity('permission')
@Unique(['code'])
export class PermissionEntity extends BaseEntity {
  @Field()
  @Column({ length: 6, nullable: false })
  code: string;

  @Field()
  @Column({ length: 100, nullable: false })
  description: string;
}
