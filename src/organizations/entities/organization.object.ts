import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base-entity';
import { IsOptional } from 'class-validator';

@ObjectType()
@Entity('organization')
export class OrganizationEntity extends BaseEntity {
  @Field({ nullable: true })
  @Column({ length: 100, nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ name: 'date_begin', nullable: true })
  @IsOptional()
  dateBegin?: Date;

  @Field({ nullable: true })
  @Column({ name: 'date_end', nullable: true })
  @IsOptional()
  dateEnd?: Date;
}
