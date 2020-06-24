import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base-entity';
import { IsOptional } from 'class-validator';

@ObjectType()
@Entity('organization')
export class OrganizationEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @IsOptional()
  id: number;

  @Field()
  @Column({ length: 100, nullable: false })
  description: string;
}
