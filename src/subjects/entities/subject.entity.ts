import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsOptional } from 'class-validator';
import { BaseEntity } from 'src/base-entity';
import { UserEntity } from '../../users/entities/user.entity';

@ObjectType()
@Entity('subject')
export class SubjectEntity extends BaseEntity {
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
  @Column({ nullable: true, default: true })
  @IsOptional()
  status?: boolean;

  @Field({ nullable: true })
  @Column({ name: 'user_created_id', nullable: true })
  @IsOptional()
  userCreatedId?: number;

  @Field({ nullable: true })
  @Column({ name: 'user_updated_id', nullable: true })
  @IsOptional()
  userUpdatedId?: number;

  @Field(type => UserEntity, { nullable: true })
  @ManyToOne(type => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_created' })
  @IsOptional()
  userCreated?: UserEntity;

  @Field(type => UserEntity, { nullable: true })
  @ManyToOne(type => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated' })
  @IsOptional()
  userUpdated?: UserEntity;
}
