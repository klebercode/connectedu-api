import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  Unique,
  OneToOne,
} from 'typeorm';
import { IsOptional } from 'class-validator';
import { UserBaseEntity } from 'src/users/entities/user-base-entity';
import { UserEntity } from '../../users/entities/user.entity';
import { SubjectEntity } from '../../subjects/entities/subject.entity';
import { ClassRoomItemEntity } from '../../classroomitems/entities/classroomitem.entity';

@ObjectType()
@Entity('classroominject')
@Unique(['classroomItemId'])
export class ClassRoomInjectEntity extends UserBaseEntity {
  @Field({ nullable: true })
  @Column({ name: 'classroom_item_id', nullable: false })
  @IsOptional()
  classroomItemId?: number;

  @Field(type => ClassRoomItemEntity, { nullable: true })
  @OneToOne(type => ClassRoomItemEntity)
  @JoinColumn({ name: 'classroom_item_id' })
  @IsOptional()
  classroomItem?: ClassRoomItemEntity;

  @Field({ nullable: true })
  @Column({ name: 'subject1_id', nullable: true })
  @IsOptional()
  subject1Id?: number;

  @Field(type => SubjectEntity, { nullable: true })
  @JoinColumn({ name: 'subject1_id' })
  @ManyToOne(type => SubjectEntity)
  @IsOptional()
  subject1?: SubjectEntity;

  @Field({ nullable: true })
  @Column({ name: 'subject2_id', nullable: true })
  @IsOptional()
  subject2Id?: number;

  @Field(type => SubjectEntity, { nullable: true })
  @JoinColumn({ name: 'subject2_id' })
  @ManyToOne(type => SubjectEntity)
  @IsOptional()
  subject2?: SubjectEntity;

  @Field({ nullable: true })
  @Column({ name: 'subject3_id', nullable: true })
  @IsOptional()
  subject3Id?: number;

  @Field(type => SubjectEntity, { nullable: true })
  @IsOptional()
  @JoinColumn({ name: 'subject3_id' })
  @ManyToOne(type => SubjectEntity)
  subject3?: SubjectEntity;

  @Field({ nullable: true })
  @Column({ name: 'subject4_id', nullable: true })
  @IsOptional()
  subject4Id?: number;

  @Field(type => SubjectEntity, { nullable: true })
  @JoinColumn({ name: 'subject4_id' })
  @ManyToOne(type => SubjectEntity)
  @IsOptional()
  subject4?: SubjectEntity;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  average?: number;
}
