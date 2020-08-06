import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { IsOptional, IsEmail } from 'class-validator';
import { Paginated } from '../../common/pages';

import { StateEntity } from '../../states/entities/state.object';
import { UserBaseEntity } from '../../users/entities/user-base-entity';
import { CityEntity } from '../../cities/entities/city.object';
import { ResponsibleEntity } from '../../responsibles/entities/responsible.entity';

@ObjectType()
@Entity('student')
export class StudentEntity extends UserBaseEntity {
  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  @IsOptional()
  name: string;

  @Field({ nullable: true })
  @Column({ name: 'use_nick_name', nullable: true })
  @IsOptional()
  useNickName: boolean;

  @Field({ nullable: true })
  @Column({ name: 'nick_name', type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  nickName: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ name: 'date_birth', nullable: true })
  @IsOptional()
  dateBirth: Date;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 1, nullable: true })
  @IsOptional()
  gender?: string;

  @Field({ nullable: true })
  @Column({
    name: 'code_nationality',
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  @IsOptional()
  codeNationality?: string;

  @Field({ nullable: true })
  @Column({ name: 'state_naturalness_id', nullable: true })
  @IsOptional()
  stateNaturalnessId?: number;

  // usando com tabale  publica
  @Field(type => StateEntity, { nullable: true })
  @IsOptional()
  stateNaturalness?: StateEntity;

  @Field({ nullable: true })
  @Column({ name: 'city_naturalness_id', nullable: true })
  @IsOptional()
  cityNaturalnessId?: number;

  // usando com tabale  publica
  @Field(type => CityEntity, { nullable: true })
  @IsOptional()
  cityNaturalness?: CityEntity;

  @Field({ nullable: true })
  @Column({
    name: 'state_naturalness_foreign',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  @IsOptional()
  stateNaturalnessForeign?: string;

  @Field({ nullable: true })
  @Column({
    name: 'naturalness_foreign',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  @IsOptional()
  naturalnessForeign?: string;

  @Field({ nullable: true })
  @Column({
    name: 'nationality_foreign',
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  @IsOptional()
  nationalityForeign?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 1, nullable: true })
  @IsOptional()
  reside?: string;

  @Field({ nullable: true })
  @Column({ name: 'reside_responsable_id', nullable: true })
  @IsOptional()
  resideResponsableId?: number;

  @Field(type => ResponsibleEntity, { nullable: true })
  @JoinColumn({ name: 'reside_responsable_id' })
  @ManyToOne(type => ResponsibleEntity)
  @IsOptional()
  resideResponsable?: ResponsibleEntity;

  @Field({ nullable: true })
  @Column({ name: 'father_id', nullable: true })
  @IsOptional()
  fatherId?: number;

  @Field(type => ResponsibleEntity, { nullable: true })
  @JoinColumn({ name: 'father_id' })
  @ManyToOne(type => ResponsibleEntity)
  @IsOptional()
  father?: ResponsibleEntity;

  @Field({ nullable: true })
  @Column({ name: 'mother_id', nullable: true })
  @IsOptional()
  motherId?: number;

  @Field(type => ResponsibleEntity, { nullable: true })
  @JoinColumn({ name: 'mother_id' })
  @ManyToOne(type => ResponsibleEntity)
  @IsOptional()
  mother?: ResponsibleEntity;

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
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  note?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  profile?: string;
}

@ObjectType()
export class StudentPaginated extends Paginated<StudentEntity>(StudentEntity) {}
