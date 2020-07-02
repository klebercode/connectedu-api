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
  @Field({ nullable: true })
  @Column({ name: 'user_id', nullable: false })
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(type => UserEntity)
  @IsOptional()
  userId?: number;

  @Field(type => UserEntity, { nullable: true })
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

  //Campos de usuario padrão
  @Field({ nullable: true })
  @Column({ name: 'user_created_id', nullable: true })
  @JoinColumn({ name: 'user_created_id' })
  @ManyToOne(type => UserEntity)
  @IsOptional()
  userCreatedId?: number;

  @Field(type => UserEntity, { nullable: true })
  @IsOptional()
  userCreated?: UserEntity;

  @Field({ nullable: true })
  @Column({ name: 'user_updated_id', nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  @ManyToOne(type => UserEntity)
  @IsOptional()
  userUpdatedId?: number;

  @Field(type => UserEntity, { nullable: true })
  @IsOptional()
  userUpdated?: UserEntity;
}
