import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { Paginated } from '../../common/pages';

import { StateEntity } from '../../states/entities/state.object';
import { IsOptional, IsEmail } from 'class-validator';
import { UserBaseEntity } from '../../users/entities/user-base-entity';
import { CityEntity } from '../../cities/entities/city.object';

@ObjectType()
@Entity('teacher')
export class TeacherEntity extends UserBaseEntity {
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
  complement?: string;

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
  @Column({ nullable: true })
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
  @Column({ length: 10, nullable: true })
  token?: string;
}

@ObjectType()
export class TeacherPaginated extends Paginated<TeacherEntity>(TeacherEntity) {}
