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
import { UserEntity } from './user.entity';

@ObjectType()
@Entity()
export class UserBaseEntity {
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

  @Field(type => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_created_id' })
  @ManyToOne(type => UserEntity, { nullable: true })
  @IsOptional()
  userCreated?: UserEntity;

  @Field({ nullable: true })
  @Column({ name: 'user_updated_id', nullable: true })
  @IsOptional()
  userUpdatedId?: number;

  @Field(type => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  @ManyToOne(type => UserEntity, { nullable: true })
  @IsOptional()
  userUpdated?: UserEntity;
}
