import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsOptional } from 'class-validator';
import { BaseEntity } from 'src/base-entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ClassRoomEntity } from '../../classrooms/entities/classroom.entity';
import { SubjectEntity } from '../../subjects/entities/subject.entity';
import { TeacherEntity } from '../../teachers/entities/teacher.entity';

@ObjectType()
@Entity('classroomitem')
@Unique(['classroomId', 'subjectId'])
export class ClassRoomItemEntity extends BaseEntity {
  @Field({ nullable: true })
  @ManyToOne(type => ClassRoomEntity)
  @Column({ name: 'classroom_id', nullable: false })
  @JoinColumn({ name: 'classroom_id' })
  @IsOptional()
  classroomId?: number;

  @Field(type => ClassRoomEntity, { nullable: true })
  @IsOptional()
  classroom?: ClassRoomEntity;

  @Field({ nullable: true })
  @ManyToOne(type => SubjectEntity)
  @Column({ name: 'subject_id', nullable: false })
  @JoinColumn({ name: 'subject_id' })
  @IsOptional()
  subjectId?: number;

  @Field(type => SubjectEntity, { nullable: true })
  @IsOptional()
  subject?: SubjectEntity;

  @Field({ nullable: true })
  @Column({ name: 'teacher_id', nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  @ManyToOne(type => TeacherEntity)
  @IsOptional()
  teacherId?: number;

  @Field(type => TeacherEntity, { nullable: true })
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

  //Campos de usuario padrão
  @Field({ nullable: true })
  @Column({ name: 'user_created_id', nullable: false })
  @JoinColumn({ name: 'user_created_id' })
  @ManyToOne(type => UserEntity)
  @IsOptional()
  userCreatedId?: number;

  @Field({ nullable: true })
  @Column({ name: 'user_updated_id', nullable: true })
  @ManyToOne(type => UserEntity)
  @JoinColumn({ name: 'user_updated_id' })
  @IsOptional()
  userUpdatedId?: number;

  @Field(type => UserEntity, { nullable: true })
  @IsOptional()
  userCreated?: UserEntity;

  @Field(type => UserEntity, { nullable: true })
  @IsOptional()
  userUpdated?: UserEntity;
}
