import {
  Column,
  Entity,
  PrimaryColumn,
  Unique,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { OrganizationEntity } from '../../organizations/entities/organization.object';
import { BaseEntity } from '../../base-entity';
import { IsOptional, isEmail } from 'class-validator';

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
