import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';

import { StateEntity } from '../../states/entities/state.object';
import { IsOptional, IsEmail } from 'class-validator';
import { BaseEntity } from '../../base-entity';
import { UserEntity } from '../../users/entities/user.entity';
import { CityEntity } from '../../cities/entities/city.object';

@ObjectType()
@Entity('teacher')
export class TeacherEntity extends BaseEntity {
  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Field({ nullable: true })
  @Column({
    name: 'nick_name',
    type: 'varchar',
    length: 40,
    nullable: true,
  })
  nickName: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  adress?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 60, nullable: true })
  @IsOptional()
  district?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 60, nullable: true })
  @IsOptional()
  complemt?: string;

  @Field({ nullable: true })
  @Column({ name: 'state_id', nullable: true })
  @IsOptional()
  stateId?: number;

  // usando com tabale  publica
  @Field(type => StateEntity, { nullable: true })
  @IsOptional()
  state?: StateEntity;

  @Field({ nullable: true })
  @Column({ name: 'city_id', nullable: true })
  @IsOptional()
  cityId?: number;

  // usando com tabale  publica
  @Field(type => CityEntity, { nullable: true })
  @IsOptional()
  city?: CityEntity;

  // campo CEP
  @Field({ nullable: true })
  @Column({ name: 'zip_code', type: 'varchar', length: 10, nullable: true })
  @IsOptional()
  zipCode?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 14, nullable: true })
  @IsOptional()
  phone?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 15, nullable: true })
  @IsOptional()
  cellphone?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 15, nullable: true })
  @IsOptional()
  whatsapp?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 14, nullable: true })
  @IsOptional()
  cpf?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 15, nullable: true })
  @IsOptional()
  identity?: string;

  @Field({ nullable: true })
  @Column({ name: 'org_identity', type: 'varchar', length: 15, nullable: true })
  @IsOptional()
  OrgIdentity?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, default: true })
  @IsOptional()
  status?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  note?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  profile?: string;

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
