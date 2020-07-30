import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, Unique } from 'typeorm';
import { Paginated } from '../../common/pages';

import { BaseEntity } from '../../base-entity';
import { OrganizationEntity } from '../../organizations/entities/organization.object';
import { Customer } from '../../customers/entities/customer.object';

@ObjectType()
@Entity('usertoken')
@Unique(['token'])
export class UserTokenEntity extends BaseEntity {
  @Field(type => Customer, { nullable: true })
  customer?: Customer;

  @Field({ nullable: false })
  @Column({ name: 'customer_id', nullable: false })
  customerId: number;

  @Field(type => OrganizationEntity, { nullable: true })
  organization?: OrganizationEntity;

  @Field({ nullable: false })
  @Column({ name: 'organization_id', nullable: false })
  organizationId: number;

  @Field({ nullable: true })
  @Column({ name: 'status_ativation', nullable: true })
  statusAtivation?: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ name: 'date_ativation', nullable: true })
  dateAtivation?: Date;

  @Field({ nullable: false })
  @Column({ name: 'type_user', type: 'varchar', length: 1, nullable: false })
  typeUser: string;

  @Field({ nullable: false })
  @Column({ length: 10, nullable: false })
  token?: string;
}

@ObjectType()
export class UserTokensPaginated extends Paginated<UserTokenEntity>(
  UserTokenEntity,
) {}
