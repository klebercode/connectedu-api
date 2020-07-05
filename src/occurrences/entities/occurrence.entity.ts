import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsOptional } from 'class-validator';
import { UserBaseEntity } from 'src/users/entities/user-base-entity';
import { double } from 'aws-sdk/clients/lightsail';

@ObjectType()
@Entity('occurrence')
export class OccurrenceEntity extends UserBaseEntity {
  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 60, nullable: false })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  status?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  type?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  points?: number;
}
