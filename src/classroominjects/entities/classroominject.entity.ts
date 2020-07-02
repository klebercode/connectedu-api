import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsOptional } from 'class-validator';
import { BaseEntity } from 'src/base-entity';
import { UserEntity } from '../../users/entities/user.entity';
import { SubjectEntity } from '../../subjects/entities/subject.entity';
import { ClassRoomItemEntity } from '../../classroomitems/entities/classroomitem.entity';

@ObjectType()
@Entity('classroominject')
export class ClassRoomInjectEntity extends BaseEntity {
  @Field({ nullable: true })
  @Column({ name: 'classroom_item_id', nullable: false })
  @ManyToOne(type => ClassRoomItemEntity)
  @JoinColumn({ name: 'classroom_item_id' })
  @IsOptional()
  classroomItemId?: number;

  @Field(type => ClassRoomItemEntity, { nullable: true })
  @IsOptional()
  classroomItem?: ClassRoomItemEntity;

  @Field({ nullable: true })
  @Column({ name: 'subject1_id', nullable: true })
  @JoinColumn({ name: 'subject1_id' })
  @ManyToOne(type => SubjectEntity)
  @IsOptional()
  subject1Id?: number;

  @Field(type => SubjectEntity, { nullable: true })
  @IsOptional()
  subject1?: SubjectEntity;

  @Field({ nullable: true })
  @Column({ name: 'subject2_id', nullable: true })
  @JoinColumn({ name: 'subject2_id' })
  @ManyToOne(type => SubjectEntity)
  @IsOptional()
  subject2Id?: number;

  @Field(type => SubjectEntity, { nullable: true })
  @IsOptional()
  subject2?: SubjectEntity;

  @Field({ nullable: true })
  @Column({ name: 'subject3_id', nullable: true })
  @JoinColumn({ name: 'subject3_id' })
  @ManyToOne(type => SubjectEntity)
  @IsOptional()
  subject3Id?: number;

  @Field(type => SubjectEntity, { nullable: true })
  @IsOptional()
  subject3?: SubjectEntity;

  @Field({ nullable: true })
  @Column({ name: 'subject4_id', nullable: true })
  @JoinColumn({ name: 'subject4_id' })
  @ManyToOne(type => SubjectEntity)
  @IsOptional()
  subject4Id?: number;

  @Field(type => SubjectEntity, { nullable: true })
  @IsOptional()
  subject4?: SubjectEntity;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  average?: number;

  //Campos de usuario padrão
  @Field({ nullable: true })
  @Column({ name: 'user_created_id', nullable: true })
  @JoinColumn({ name: 'user_created_id' })
  @ManyToOne(type => UserEntity)
  @IsOptional()
  userCreatedId?: number;

  @Field(type => UserEntity, { nullable: true })
  @IsOptional()
  userCreated?: UserEntity;

  @Field({ nullable: true })
  @Column({ name: 'user_updated_id', nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  @ManyToOne(type => UserEntity)
  @IsOptional()
  userUpdatedId?: number;

  @Field(type => UserEntity, { nullable: true })
  @IsOptional()
  userUpdated?: UserEntity;
}
