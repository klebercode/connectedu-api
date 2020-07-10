import { Field, ObjectType, GraphQLISODateTime, ID } from '@nestjs/graphql';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { IsOptional, isEmail } from 'class-validator';
import { BaseEntity } from '../../base-entity';
import { Optional } from '@nestjs/common';

@ObjectType()
@Entity('user')
@Unique(['login'])
export class UserEntity extends BaseEntity {
  @Field({ nullable: false })
  @Optional()
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Field({ nullable: true })
  @Optional()
  @Column({ name: 'nick_name', type: 'varchar', length: 100, nullable: true })
  nickName: string;

  @Field({ nullable: false })
  @Optional()
  @Column({ type: 'varchar', length: 40, nullable: false })
  login: string;

  @Field({ nullable: true })
  @Optional()
  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Field({ nullable: false })
  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Field({ nullable: true })
  @Optional()
  @Column({ type: 'varchar', length: 100, nullable: true })
  profile: string;

  @Field({ nullable: true })
  @Optional()
  @Column({ name: 'code_token', nullable: true })
  codeToken: number;

  //Campos de usuario padrão
  @Field({ nullable: true })
  @Column({ name: 'user_created_id', nullable: true })
  @IsOptional()
  userCreatedId?: number;

  @Field(type => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_created_id' })
  //@ManyToOne(type => UserEntity, { nullable: true })
  @IsOptional()
  userCreated?: UserEntity;

  @Field({ nullable: true })
  @Column({ name: 'user_updated_id', nullable: true })
  @IsOptional()
  userUpdatedId?: number;

  @Field(type => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  //@ManyToOne(type => UserEntity, { nullable: true })
  @IsOptional()
  userUpdated?: UserEntity;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Optional()
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Optional()
  updatedAt?: Date;
}
