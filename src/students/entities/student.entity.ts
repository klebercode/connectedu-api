import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { IsOptional, IsEmail } from 'class-validator';
import { Paginated } from '../../common/pages';

import { StateEntity } from '../../states/entities/state.object';
import { BasicFields } from 'src/common/types/basicfields';
import { CityEntity } from '../../cities/entities/city.object';
import { ResponsibleEntity } from '../../responsibles/entities/responsible.entity';

@ObjectType()
@Entity('student')
export class StudentEntity extends BasicFields {
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

  // estado
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

  // usando com tabale publica cidade
  @Field(type => StateEntity, { nullable: true })
  @IsOptional()
  stateNaturalness?: StateEntity;

  @Field({ nullable: true })
  @Column({ name: 'city_naturalness_id', nullable: true })
  @IsOptional()
  cityNaturalnessId?: number;

  // usando com tabale publica estado
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
  @Column({
    name: 'father_id',
    nullable: true,
  })
  @IsOptional()
  fatherId?: number;

  @Field({ nullable: true })
  @Column({
    name: 'reside_father',
    nullable: true,
  })
  @IsOptional()
  resideFather?: boolean;

  @Field({ nullable: true })
  @Column({
    name: 'mother_id',
    nullable: true,
  })
  @IsOptional()
  motherId?: number;

  @Field({ nullable: true })
  @Column({
    name: 'reside_mother',
    nullable: true,
  })
  @IsOptional()
  resideMother?: boolean;

  @Field(type => ResponsibleEntity, { nullable: true })
  @JoinColumn({ name: 'father_id' })
  @ManyToOne(type => ResponsibleEntity)
  @IsOptional()
  father?: ResponsibleEntity;

  @Field(type => ResponsibleEntity, { nullable: true })
  @JoinColumn({ name: 'mother_id' })
  @ManyToOne(type => ResponsibleEntity)
  @IsOptional()
  mother?: ResponsibleEntity;

  @Field({ nullable: true })
  @Column({
    name: 'type_reside',
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  @IsOptional()
  typeReside?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 60, nullable: true })
  @IsOptional()
  reside?: string;

  @Field({ nullable: true })
  @Column({ name: 'separated_parents', nullable: true })
  @IsOptional()
  separatedParents?: boolean;

  @Field(type => ResponsibleEntity, { nullable: true })
  @JoinColumn({ name: 'reside_responsable_id' })
  @ManyToOne(type => ResponsibleEntity)
  @IsOptional()
  resideResponsable?: ResponsibleEntity;

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
  @Column({ name: 'school_last', type: 'varchar', length: 60, nullable: true })
  @IsOptional()
  schoolLast?: string;

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
  @Column({
    name: 'registry_name',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @IsOptional()
  registryName?: string;

  @Field({ nullable: true })
  @Column({
    name: 'certificate_number',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @IsOptional()
  certificateNumber?: string;

  @Field({ nullable: true })
  @Column({ name: 'book_number', type: 'varchar', length: 15, nullable: true })
  @IsOptional()
  bookNumber?: string;

  @Field({ nullable: true })
  @Column({ name: 'book_sheet', type: 'varchar', length: 15, nullable: true })
  @IsOptional()
  bookSheet?: string;

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
