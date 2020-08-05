import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, Unique } from 'typeorm';
import { Paginated } from '../../common/pages';
import { TypeUser } from '../../common/enums/enum-usertoken';

import { BaseEntity } from '../../base-entity';
import { OrganizationEntity } from '../../organizations/entities/organization.object';
import { Customer } from '../../customers/entities/customer.object';

@ObjectType()
@Entity('acesstoken')
@Unique(['token'])
export class AcessTokenEntity extends BaseEntity {
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
  @Column({ name: 'status_ativation_app', nullable: false })
  statusAtivationApp?: boolean;

  @Field({ nullable: true })
  @Column({ name: 'status_ativation_web', nullable: false })
  statusAtivationWeb?: boolean;

  @Field(type => TypeUser, { nullable: true })
  @Column({ name: 'type_user', nullable: false })
  typeUser?: TypeUser;

  @Field({ nullable: true })
  @Column({ length: 12, nullable: false })
  token?: string;
}

@ObjectType()
export class AcessTokensPaginated extends Paginated<AcessTokenEntity>(
  AcessTokenEntity,
) {}
