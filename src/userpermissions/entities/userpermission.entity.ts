import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Paginated } from '../../common/pages';

import { UserBaseEntity } from 'src/users/entities/user-base-entity';
import { PermissionEntity } from '../../permissions/entities/permission.object';
import { UserEntity } from '../../users/entities/user.entity';

@ObjectType()
@Entity('userpermission')
@Unique(['userId', 'codeId'])
export class UserPermissionEntity extends UserBaseEntity {
  @Field({ nullable: true })
  @Column({ name: 'user_id', nullable: false })
  @IsOptional()
  userId?: number;

  @Field(type => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(type => UserEntity)
  @IsOptional()
  user?: UserEntity;

  // usando com tabale  publica
  @Field({ nullable: false })
  @Column({ name: 'code_id', nullable: false })
  @IsOptional()
  codeId?: number;

  // usando com tabale  publica
  @Field(type => PermissionEntity, { nullable: true })
  @IsOptional()
  code?: PermissionEntity;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  create?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  edit?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  delete?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  list?: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  visible?: boolean;
}

@ObjectType()
export class UserPermissionPaginated extends Paginated<UserPermissionEntity>(
  UserPermissionEntity,
) {}
