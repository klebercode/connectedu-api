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

  @Field({ nullable: true })
  @CreateDateColumn({ name: 'created_at' })
  @IsOptional()
  createdAt?: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ name: 'updated_at' })
  @IsOptional()
  updatedAt?: Date;
}
