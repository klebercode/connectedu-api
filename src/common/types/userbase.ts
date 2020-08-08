import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Column,
  Entity,
} from 'typeorm';
import { IsOptional } from 'class-validator';
import { UserCenterEntity } from '../../usercenter/entities/usercenter.entity';
import { TypeUser } from '../enums/enum-usertoken';

@ObjectType()
@Entity()
export class UserBase {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @IsOptional()
  id: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @CreateDateColumn({ name: 'created_at', nullable: true })
  @IsOptional()
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  @IsOptional()
  updatedAt?: Date;

  //Campos de usuario padrão
  @Field({ nullable: true })
  @Column({ name: 'user_created_id', nullable: true })
  @IsOptional()
  userCreatedId?: number;

  @Field(type => TypeUser, { nullable: true })
  @Column({ name: 'user_created_type', nullable: true })
  @IsOptional()
  userTypeCreated?: TypeUser;

  @Field(type => UserCenterEntity, { nullable: true })
  @JoinColumn({ name: 'user_created_id' })
  @ManyToOne(type => UserCenterEntity, { nullable: true })
  @IsOptional()
  userCreated?: UserCenterEntity;

  @Field({ nullable: true })
  @Column({ name: 'user_updated_id', nullable: true })
  @IsOptional()
  userUpdatedId?: number;

  @Field(type => TypeUser, { nullable: true })
  @Column({ name: 'user_updated_type', nullable: true })
  @IsOptional()
  userTypeUpdated?: TypeUser;

  @Field(type => UserCenterEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  @ManyToOne(type => UserCenterEntity, { nullable: true })
  @IsOptional()
  userUpdated?: UserCenterEntity;
}
