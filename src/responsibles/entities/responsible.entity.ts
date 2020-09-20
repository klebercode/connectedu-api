import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { Paginated } from '../../common/pages';

import { StateEntity } from '../../states/entities/state.object';
import { IsOptional, IsEmail } from 'class-validator';
import { BasicFields } from 'src/common/types/basicfields';
import { CityEntity } from '../../cities/entities/city.object';

@ObjectType()
@Entity('responsible')
export class ResponsibleEntity extends BasicFields {
  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  @IsOptional()
  name: string;

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
  @Column({ type: 'varchar', length: 30, nullable: true })
  @IsOptional()
  nationality?: string;

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
  orgIdentity?: string;

  @Field({ nullable: true })
  @Column({ name: 'civil_status', type: 'varchar', length: 1, nullable: true })
  @IsOptional()
  civilStatus?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  note?: string;

  @Field({ nullable: true })
  @Column({ name: 'profession', type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  profession?: string;

  @Field({ nullable: true })
  @Column({
    name: 'work_company',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @IsOptional()
  workCompany?: string;

  @Field({ nullable: true })
  @Column({
    name: 'work_phone',
    type: 'varchar',
    length: 14,
    nullable: true,
  })
  @IsOptional()
  workPhone?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  profile?: string;
}

@ObjectType()
export class ResponsiblePaginated extends Paginated<ResponsibleEntity>(
  ResponsibleEntity,
) {}
