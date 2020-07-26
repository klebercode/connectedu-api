import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Paginated } from '../../common/pages';

import { UserBaseEntity } from 'src/users/entities/user-base-entity';

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

@ObjectType()
export class OccurrencePaginated extends Paginated<OccurrenceEntity>(
  OccurrenceEntity,
) {}
