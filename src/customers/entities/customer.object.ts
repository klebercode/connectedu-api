import {
  Column,
  Entity,
  PrimaryColumn,
  Unique,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { OrganizationEntity } from '../../organizations/entities/organization.object';
import { BaseEntity } from '../../base-entity';

@Entity()
@ObjectType()
@Unique(['host'])
export class Customer extends BaseEntity {
  @Field()
  @Column()
  host: string;

  @Field()
  @Column()
  domain: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ name: 'organization_id', nullable: true })
  organizationId?: number;
}
