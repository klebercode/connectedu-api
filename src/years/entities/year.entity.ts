import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsOptional } from 'class-validator';
import { BaseEntity } from 'src/base-entity';
import { PermissionEntity } from '../../permissions/entities/permission.object';
import { UserEntity } from '../../users/entities/user.entity';

@ObjectType()
@Entity('year')
@Unique(['year'])
export class YearEntity extends BaseEntity {
  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 4, nullable: false })
  @IsOptional()
  year?: string;

  @Field({ nullable: true })
  @Column({ name: 'date_begin', nullable: true })
  @IsOptional()
  dateBegin?: Date;

  @Field({ nullable: true })
  @Column({ name: 'date_end', nullable: true })
  @IsOptional()
  dateEnd?: Date;

  @Field({ nullable: true })
  @Column({ name: 'date_module1', nullable: true })
  @IsOptional()
  dateModule1?: Date;

  @Field({ nullable: true })
  @Column({ name: 'date_module2', nullable: true })
  @IsOptional()
  dateModule2?: Date;

  @Field({ nullable: true })
  @Column({ name: 'date_module3', nullable: true })
  @IsOptional()
  dateModule3?: Date;

  @Field({ nullable: true })
  @Column({ name: 'date_module4', nullable: true })
  @IsOptional()
  dateModule4?: Date;

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
