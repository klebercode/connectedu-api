import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { IsOptional } from 'class-validator';

@ObjectType()
export class BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @IsOptional()
  id: number;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  @Field({ nullable: true })
  @IsOptional()
  updatedAt?: Date;
}
