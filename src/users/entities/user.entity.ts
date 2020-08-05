import { ID, Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Entity,
  Column,
  JoinColumn,
  Unique,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsOptional, isEmail } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Paginated } from '../../common/pages';

@ObjectType()
@Entity('user')
@Unique(['login'])
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @IsOptional()
  id: number;

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
  @CreateDateColumn({ name: 'created_at', nullable: true })
  @IsOptional()
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  @IsOptional()
  updatedAt?: Date;
}

@ObjectType()
export class UserPaginated extends Paginated<UserEntity>(UserEntity) {}
