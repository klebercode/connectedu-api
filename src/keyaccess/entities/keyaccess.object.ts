import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, Unique } from 'typeorm';
import { Paginated } from '../../common/pages';
import { TypeUser } from '../../common/enums/enum-usertoken';

import { OrganizationEntity } from '../../organizations/entities/organization.object';
import { Customer } from '../../customers/entities/customer.object';
import { BaseEntity } from '../../base-entity';

@ObjectType()
@Entity('keyaccess')
@Unique(['keyAccess'])
export class KeyAccessEntity extends BaseEntity {
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
  @Column({ name: 'status_active_app', nullable: false })
  statusActiveApp?: boolean;

  @Field({ nullable: true })
  @Column({ name: 'status_active_web', nullable: false })
  statusActiveWeb?: boolean;

  @Field(type => TypeUser, { nullable: true })
  @Column({ name: 'type_user', nullable: false })
  typeUser?: TypeUser;

  @Field({ nullable: true })
  @Column({ name: 'key_access', length: 20, nullable: true })
  keyAccess?: string;
}

@ObjectType()
export class KeyAccessPaginated extends Paginated<KeyAccessEntity>(
  KeyAccessEntity,
) {}
