import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsOptional } from 'class-validator';
import { BaseEntity } from 'src/base-entity';
import { PermissionEntity } from '../../permissions/entities/permission.object';
import { UserEntity } from '../../users/entities/user.entity';

@ObjectType()
@Entity('user_permission')
@Unique(['userId', 'codeId'])
export class UserPermissionEntity extends BaseEntity {
  @Field({ nullable: false })
  @Column({ name: 'user_id', nullable: false })
  @IsOptional()
  userId?: number;

  @Field(type => UserEntity, { nullable: true })
  @ManyToOne(type => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user' })
  @IsOptional()
  user?: UserEntity;

  @Field({ nullable: false })
  @Column({ name: 'code_id', nullable: false })
  @IsOptional()
  codeId?: number;

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
