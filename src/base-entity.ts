import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsOptional } from 'class-validator';

@ObjectType()
export class BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  @IsOptional()
  id: number;

  @Field({ name: 'createdAt', nullable: true })
  @CreateDateColumn()
  @IsOptional()
  created_at?: Date;

  @Field({ name: 'updatedAt', nullable: true })
  @UpdateDateColumn()
  @IsOptional()
  updated_at?: Date;
}
