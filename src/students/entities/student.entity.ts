import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base-entity';
import { UserEntity } from '../../users/entities/user.entity';
import { StateEntity } from '../../states/entities/state.object';
import { IsOptional } from 'class-validator';

@ObjectType()
@Entity('student')
export class StudentEntity extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  endereco?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  bairro?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  cidade?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  stateId?: number;

  @Field(type => StateEntity, { nullable: true })
  @IsOptional()
  state?: StateEntity;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  image?: string;

  @Field({ nullable: true })
  @Column({ name: 'user_created_id', nullable: true })
  @IsOptional()
  userCreatedId?: number;

  @Field({ nullable: true })
  @Column({ name: 'user_updated_id', nullable: true })
  @IsOptional()
  userUpdatedId?: number;

  @Field(type => UserEntity, { nullable: true })
  @ManyToOne(type => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_created' })
  @IsOptional()
  userCreated?: UserEntity;

  @Field(type => UserEntity, { nullable: true })
  @ManyToOne(type => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated' })
  @IsOptional()
  userUpdated?: UserEntity;
}
