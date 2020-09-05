import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, Column, Unique } from 'typeorm';
import { Paginated } from '../../common/pages';

import { BasicFields } from '../../common/types/basicfields';

@ObjectType()
@Entity('permission')
@Unique(['code'])
export class PermissionEntity extends BasicFields {
  @Field()
  @Column({ length: 6, nullable: false })
  code: string;

  @Field()
  @Column({ length: 100, nullable: false })
  description: string;

  @Field()
  @Column({ length: 3, nullable: false })
  type: string;
}

@ObjectType()
export class PermissionPaginated extends Paginated<PermissionEntity>(
  PermissionEntity,
) {}
