import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Paginated } from '../../common/pages';

import { BasicFields } from 'src/common/types/basicfields';
import { ClassRoomEntity } from '../../classrooms/entities/classroom.entity';
import { StudentEntity } from '../../students/entities/student.entity';
import { YearEntity } from '../../years/entities/year.entity';
import { ResponsibleEntity } from '../../responsibles/entities/responsible.entity';

@ObjectType()
@Entity('studentinformation')
@Unique(['studentId', 'yearId'])
export class StudentInformationEntity extends BasicFields {
  @Field({ nullable: true })
  @Column({ name: 'student_id', nullable: false })
  @IsOptional()
  studentId?: number;

  @Field(type => StudentEntity, { nullable: true })
  @ManyToOne(type => StudentEntity)
  @JoinColumn({ name: 'student_id' })
  @IsOptional()
  student?: StudentEntity;

  @Field({ nullable: true })
  @Column({ name: 'year_id', nullable: false })
  @IsOptional()
  yearId?: number;

  @Field(type => YearEntity, { nullable: true })
  @ManyToOne(type => YearEntity)
  @JoinColumn({ name: 'year_id' })
  @IsOptional()
  year?: YearEntity;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ name: 'date_registration', nullable: true })
  @IsOptional()
  dateRegistration?: Date;

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
  @Column({ type: 'varchar', length: 1, nullable: true })
  @IsOptional()
  situation?: string;

  @Field({ nullable: true })
  @Column({ name: 'number_student', nullable: true })
  @IsOptional()
  numberStudent?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  payday?: number;

  @Field({ nullable: true })
  @Column({ name: 'form_payment', nullable: true })
  @IsOptional()
  formPayment?: number;

  @Field({ nullable: true })
  @Column({ name: 'monthly_discount', nullable: true })
  @IsOptional()
  monthlyDiscount?: number;

  @Field({ nullable: true })
  @Column({ name: 'date_exit', nullable: true })
  @IsOptional()
  dateExit?: Date;

  @Field({ nullable: true })
  @Column({ name: 'reason_exit', length: 2, nullable: true })
  @IsOptional()
  reasonExit?: string;

  @Field({ nullable: true })
  @Column({ name: 'description_reason', length: 100, nullable: true })
  @IsOptional()
  descriptionReason?: string;

  @Field({ nullable: true })
  @Column({ name: 'responsible1_id', nullable: true })
  @IsOptional()
  responsible1Id?: number;

  @Field(type => ResponsibleEntity, { nullable: true })
  @ManyToOne(type => ResponsibleEntity)
  @JoinColumn({ name: 'responsible1_id' })
  @IsOptional()
  responsible1?: ResponsibleEntity;

  @Field({ nullable: true })
  @Column({ name: 'relationship1', nullable: true })
  @IsOptional()
  relationship1?: number;

  @Field({ nullable: true })
  @Column({ name: 'responsible2_id', nullable: true })
  @IsOptional()
  responsible2Id?: number;

  @Field(type => ResponsibleEntity, { nullable: true })
  @ManyToOne(type => ResponsibleEntity)
  @JoinColumn({ name: 'responsible2_id' })
  @IsOptional()
  responsible2?: ResponsibleEntity;

  @Field({ nullable: true })
  @Column({ name: 'relationship2', nullable: true })
  @IsOptional()
  relationship2?: number;

  @Field({ nullable: true })
  @Column({ name: 'responsible_pedag_id', nullable: true })
  @IsOptional()
  responsiblePedagId?: number;

  @Field(type => ResponsibleEntity, { nullable: true })
  @ManyToOne(type => ResponsibleEntity)
  @JoinColumn({ name: 'responsible_pedag_id' })
  @IsOptional()
  responsiblePedag?: ResponsibleEntity;

  @Field({ nullable: true })
  @Column({ name: 'relationship_pedag', nullable: true })
  @IsOptional()
  relationshipPedag?: number;

  @Field({ nullable: true })
  @Column({ name: 'new_student', nullable: true })
  @IsOptional()
  newStudent?: boolean;
}

@ObjectType()
export class StudentInformationPaginated extends Paginated<
  StudentInformationEntity
>(StudentInformationEntity) {}
