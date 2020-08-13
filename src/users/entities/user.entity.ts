import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, Unique } from 'typeorm';
import { IsOptional, isEmail } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Paginated } from '../../common/pages';
import { BasicFields } from 'src/common/types/basicfields';

@ObjectType()
@Entity('user')
export class UserEntity extends BasicFields {
  @Field({ nullable: false })
  @Optional()
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Field({ nullable: true })
  @Optional()
  @Column({ name: 'nick_name', type: 'varchar', length: 100, nullable: true })
  nickName: string;

  @Field({ nullable: true })
  @Optional()
  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Field({ nullable: true })
  @Optional()
  @Column({ type: 'varchar', length: 100, nullable: true })
  profile: string;
}

@ObjectType()
export class UserPaginated extends Paginated<UserEntity>(UserEntity) {}
