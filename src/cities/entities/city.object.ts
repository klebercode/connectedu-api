import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Entity, Column, Unique, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base-entity';
import { IsOptional } from 'class-validator';
import { StateEntity } from '../../states/entities/state.object';

@ObjectType()
@Entity('city')
@Unique(['description'])
export class CityEntity extends BaseEntity {
  @Field({ nullable: true })
  @Column({ length: 100, nullable: false })
  description: string;

  @Field({ nullable: true })
  @Column({ name: 'state_id', nullable: true })
  @IsOptional()
  stateId?: number;

  @Field(type => StateEntity, { nullable: true })
  @JoinColumn({ name: 'state_id' })
  @ManyToOne(type => StateEntity)
  @IsOptional()
  state?: StateEntity;
}
