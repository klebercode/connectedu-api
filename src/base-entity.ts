import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
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

  @Field(() => GraphQLISODateTime, { nullable: true })
  @CreateDateColumn({ name: 'created_at', nullable: true })
  @IsOptional()
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  @IsOptional()
  updatedAt?: Date;
}
