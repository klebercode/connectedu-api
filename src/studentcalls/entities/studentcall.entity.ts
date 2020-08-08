import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Paginated } from '../../common/pages';

import { UserBase } from 'src/common/types/userbase';
import { StudentEntity } from '../../students/entities/student.entity';
import { SubjectEntity } from '../../subjects/entities/subject.entity';

@ObjectType()
@Entity('studentcall')
export class StudentCallEntity extends UserBase {
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
  @Column({ name: 'subject_id', nullable: false })
  @IsOptional()
  subjectId?: number;

  @Field(type => SubjectEntity, { nullable: false })
  @ManyToOne(type => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  @IsOptional()
  subject?: SubjectEntity;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  date?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  time?: Date;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 1, nullable: true })
  @IsOptional()
  state?: string; //(P,F)

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  justify?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  reason?: string;
}

@ObjectType()
export class StudentCallPaginated extends Paginated<StudentCallEntity>(
  StudentCallEntity,
) {}
