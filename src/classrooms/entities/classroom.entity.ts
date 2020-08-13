import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Paginated } from '../../common/pages';

import { BasicFields } from 'src/common/types/basicfields';
import { CompanyEntity } from '../../companies/entities/company.entity';
import { YearEntity } from '../../years/entities/year.entity';

@ObjectType()
@Entity('classroom')
export class ClassRoomEntity extends BasicFields {
  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: false })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 15, nullable: true })
  @IsOptional()
  abbreviation?: string;

  @Field({ nullable: true })
  @Column({
    name: 'description_minutes',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @IsOptional()
  descriptionMinutes?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 1 })
  @IsOptional()
  shift?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 10 })
  @IsOptional()
  type?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 1 })
  @IsOptional()
  level?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true, length: 2 })
  @IsOptional()
  classification?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  status?: boolean;

  @Field({ nullable: true })
  @Column({ name: 'company_id', nullable: false })
  @IsOptional()
  companyId?: number;

  @Field(type => CompanyEntity, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  @ManyToOne(type => CompanyEntity)
  @IsOptional()
  company?: CompanyEntity;

  @Field({ nullable: true })
  @Column({ name: 'year_id', nullable: false })
  @IsOptional()
  yearId?: number;

  @Field(type => YearEntity, { nullable: true })
  @JoinColumn({ name: 'year_id' })
  @ManyToOne(type => YearEntity)
  @IsOptional()
  year?: YearEntity;
}

@ObjectType()
export class ClassRoomPaginated extends Paginated<ClassRoomEntity>(
  ClassRoomEntity,
) {}
