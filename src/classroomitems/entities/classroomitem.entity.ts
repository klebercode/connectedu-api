import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Paginated } from '../../common/pages';

import { UserBaseEntity } from 'src/users/entities/user-base-entity';
import { ClassRoomEntity } from '../../classrooms/entities/classroom.entity';
import { SubjectEntity } from '../../subjects/entities/subject.entity';
import { TeacherEntity } from '../../teachers/entities/teacher.entity';

@ObjectType()
@Entity('classroomitem')
@Unique(['classroomId', 'subjectId'])
export class ClassRoomItemEntity extends UserBaseEntity {
  @Field({ nullable: true })
  @Column({ name: 'classroom_id', nullable: false })
  @IsOptional()
  classroomId?: number;

  @Field(type => ClassRoomEntity, { nullable: true })
  @ManyToOne(type => ClassRoomEntity)
  @JoinColumn({ name: 'classroom_id' })
  @IsOptional()
  classroom?: ClassRoomEntity;

  @Field({ nullable: true })
  @Column({ name: 'subject_id', nullable: false })
  @IsOptional()
  subjectId?: number;

  @Field(type => SubjectEntity, { nullable: true })
  @JoinColumn({ name: 'subject_id' })
  @ManyToOne(type => SubjectEntity)
  @IsOptional()
  subject?: SubjectEntity;

  @Field({ nullable: true })
  @Column({ name: 'teacher_id', nullable: false })
  @IsOptional()
  teacherId?: number;

  @Field(type => TeacherEntity, { nullable: true })
  @JoinColumn({ name: 'teacher_id' })
  @ManyToOne(type => TeacherEntity)
  @IsOptional()
  teacher?: TeacherEntity;

  @Field({ nullable: true })
  @Column({ name: 'work_hours', nullable: true })
  @IsOptional()
  workHours?: number;

  @Field({ nullable: true })
  @Column({ name: 'visible_report', nullable: true })
  @IsOptional()
  visibleReport?: boolean;

  @Field({ nullable: true })
  @Column({ name: 'visible_minute', nullable: true })
  @IsOptional()
  visibleMinute?: boolean;

  @Field({ nullable: true })
  @Column({ name: 'register_call', nullable: true })
  @IsOptional()
  registerCall?: boolean;

  @Field({ nullable: true })
  @Column({ name: 'register_content', nullable: true })
  @IsOptional()
  registerContent?: boolean;

  @Field({ nullable: true })
  @Column({ name: 'register_occurrence', nullable: true })
  @IsOptional()
  registerOccurrence?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 1, nullable: true })
  @IsOptional()
  type?: string;

  @Field({ nullable: true })
  @Column({ name: 'number_grades', nullable: true })
  @IsOptional()
  numberGrades?: number;

  @Field({ nullable: true })
  @Column({ name: 'garde_min', nullable: true })
  @IsOptional()
  gradeMin?: number;

  @Field({ nullable: true })
  @Column({ name: 'garde_max', nullable: true })
  @IsOptional()
  gradeMax?: number;
}

@ObjectType()
export class ClassRoomItemPaginated extends Paginated<ClassRoomItemEntity>(
  ClassRoomItemEntity,
) {}
