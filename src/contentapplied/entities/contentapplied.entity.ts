import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsOptional } from 'class-validator';

import { UserBaseEntity } from 'src/users/entities/user-base-entity';
import { YearEntity } from '../../years/entities/year.entity';
import { SubjectEntity } from '../../subjects/entities/subject.entity';
import { ClassRoomEntity } from '../../classrooms/entities/classroom.entity';
import { TeacherEntity } from '../../teachers/entities/teacher.entity';

@ObjectType()
@Entity('contentapplied')
export class ContentAppliedEntity extends UserBaseEntity {
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
  @Column({ name: 'classroom_id', nullable: false })
  @IsOptional()
  classroomId?: number;

  @Field(type => ClassRoomEntity, { nullable: false })
  @ManyToOne(type => ClassRoomEntity)
  @JoinColumn({ name: 'classroom_id' })
  @IsOptional()
  classroom?: ClassRoomEntity;

  @Field({ nullable: false })
  @Column({ name: 'teacher_id', nullable: false })
  @IsOptional()
  teacherId?: number;

  @Field(type => TeacherEntity, { nullable: false })
  @ManyToOne(type => TeacherEntity)
  @JoinColumn({ name: 'teacher_id' })
  @IsOptional()
  teacher?: TeacherEntity;

  @Field({ nullable: true })
  @Column({ name: 'class_double', nullable: true })
  @IsOptional()
  classDouble?: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  date?: Date;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  content?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  process?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  ability?: string;

  @Field({ nullable: true })
  @Column({ name: 'class_work', type: 'text', nullable: true })
  @IsOptional()
  classWork?: string;

  @Field({ nullable: true })
  @Column({ name: 'class_home', type: 'text', nullable: true })
  @IsOptional()
  classHome?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  @IsOptional()
  justify?: string;
}
