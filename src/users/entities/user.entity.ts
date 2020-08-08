import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, Unique } from 'typeorm';
import { IsOptional, isEmail } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Paginated } from '../../common/pages';
import { UserBase } from '../../common/types/userbase';

@ObjectType()
@Entity('user')
@Unique(['login'])
export class UserEntity extends UserBase {
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
}

@ObjectType()
export class UserPaginated extends Paginated<UserEntity>(UserEntity) {}
