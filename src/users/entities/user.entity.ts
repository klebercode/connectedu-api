import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsOptional, isEmail } from 'class-validator';
import { BaseEntity } from 'src/base-entity';

@ObjectType()
@Entity('user')
@Unique(['login'])
export class UserEntity extends BaseEntity {
  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Field({ nullable: true })
  @Column({ name: 'nick_name', type: 'varchar', length: 100, nullable: true })
  nickName: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 40, nullable: true })
  login: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Field()
  @Column({ type: 'varchar', length: 100, nullable: true })
  password: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  profile: string;

  @Field({ nullable: true })
  @Column({ name: 'code_token', nullable: true })
  codeToken: number;

  //Campos de usuario padrão
  @Field({ nullable: true })
  @Column({ name: 'user_created_id', nullable: true })
  @IsOptional()
  userCreatedId?: number;

  @Field(type => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_created_id' })
  @ManyToOne(type => UserEntity)
  @IsOptional()
  userCreated?: UserEntity;

  @Field({ nullable: true })
  @Column({ name: 'user_updated_id', nullable: true })
  @IsOptional()
  userUpdatedId?: number;

  @Field(type => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  @ManyToOne(type => UserEntity)
  @IsOptional()
  userUpdated?: UserEntity;
}
