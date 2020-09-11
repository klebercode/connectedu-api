import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Paginated } from '../../common/pages';

import { BasicFields } from 'src/common/types/basicfields';
import { StudentEntity } from '../../students/entities/student.entity';
import { OccurrenceEntity } from '../../occurrences/entities/occurrence.entity';
import { TeacherEntity } from '../../teachers/entities/teacher.entity';
import { SubjectEntity } from '../../subjects/entities/subject.entity';
import { EmployeeEntity } from '../../employees/entities/employee.entity';

@ObjectType()
@Entity('studentoccurrence')
export class StudentOccurrenceEntity extends BasicFields {
  @Field({ nullable: true })
  @Column({ name: 'occurrence_id', nullable: false })
  @IsOptional()
  occurrenceId?: number;

  @Field(type => OccurrenceEntity, { nullable: true })
  @ManyToOne(type => OccurrenceEntity)
  @JoinColumn({ name: 'occurrence_id' })
  @IsOptional()
  occurrence?: OccurrenceEntity;

  @Field({ nullable: true })
  @Column({ name: 'student_id', nullable: false })
  @IsOptional()
  studentId?: number;

  @Field(type => StudentEntity, { nullable: true })
  @ManyToOne(type => StudentEntity)
  @JoinColumn({ name: 'student_id' })
  @IsOptional()
  student?: StudentEntity;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ name: 'date', nullable: true })
  @IsOptional()
  date?: Date;

  @Field({ nullable: true })
  @Column({ name: 'subject_id', nullable: true })
  @IsOptional()
  subjectId?: number;

  @Field(type => SubjectEntity, { nullable: true })
  @ManyToOne(type => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  @IsOptional()
  subject?: SubjectEntity;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  note?: string;
}

@ObjectType()
export class StudentOccurrencePaginated extends Paginated<
  StudentOccurrenceEntity
>(StudentOccurrenceEntity) {}
