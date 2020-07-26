import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Paginated } from '../../common/pages';

import { BaseEntity } from '../../base-entity';

@ObjectType()
@Entity('organization')
export class OrganizationEntity extends BaseEntity {
  @Field({ nullable: true })
  @Column({ length: 100, nullable: true })
  description: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ name: 'date_begin', nullable: true })
  @IsOptional()
  dateBegin?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ name: 'date_end', nullable: true })
  @IsOptional()
  dateEnd?: Date;
}

@ObjectType()
export class OrganizationPaginated extends Paginated<OrganizationEntity>(
  OrganizationEntity,
) {}
