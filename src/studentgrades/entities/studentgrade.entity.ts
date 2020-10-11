import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Paginated } from '../../common/pages';

import { BasicFields } from '../../common/types/basicfields';
import { StudentEntity } from '../../students/entities/student.entity';
import { YearEntity } from '../../years/entities/year.entity';
import { SubjectEntity } from '../../subjects/entities/subject.entity';

@ObjectType()
@Entity('studentgrade')
export class StudentGradeEntity extends BasicFields {
  @Field({ nullable: false })
  @Column({ name: 'student_id', nullable: false })
  @IsOptional()
  studentId?: number;

  @Field(type => StudentEntity, { nullable: false })
  @ManyToOne(type => StudentEntity)
  @JoinColumn({ name: 'student_id' })
  @IsOptional()
  student?: StudentEntity;

  @Field({ nullable: false })
  @Column({ name: 'year_id', nullable: false })
  @IsOptional()
  yearId?: number;

  @Field(type => YearEntity, { nullable: false })
  @ManyToOne(type => YearEntity)
  @JoinColumn({ name: 'year_id' })
  @IsOptional()
  year?: YearEntity;

  @Field({ nullable: false })
  @Column({ name: 'subject_id', nullable: false })
  @IsOptional()
  subjectId?: number;

  @Field(type => SubjectEntity, { nullable: false })
  @ManyToOne(type => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  @IsOptional()
  subject?: SubjectEntity;

  @Field({ nullable: false })
  @Column({ type: 'varchar', length: 1, nullable: false })
  @IsOptional()
  unit?: string; //(1/2/3/4/R/F/E)

  @Field({ nullable: false })
  @Column({ name: 'type_unit', type: 'varchar', length: 1, nullable: false })
  @IsOptional()
  typeUnit?: string; //(1/R)

  @Field({ nullable: false })
  @Column({ name: 'type_grade', nullable: false })
  @IsOptional()
  typeGrade?: number;

  @Field({ nullable: true })
  @Column({ type: 'float', nullable: true })
  @IsOptional()
  grade?: number;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 10, nullable: true })
  @IsOptional()
  concept?: string;
}

@ObjectType()
export class StudentGradePaginated extends Paginated<StudentGradeEntity>(
  StudentGradeEntity,
) {}
