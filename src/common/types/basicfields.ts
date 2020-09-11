import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { IsOptional } from 'class-validator';

@ObjectType()
export class BasicFields {
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

  @Field({ nullable: true })
  @Column({ nullable: true, default: false })
  @IsOptional()
  deleted?: boolean;

  @Field({ nullable: true })
  @Column({ type: 'varchar', name: 'lagacy_code', length: 20, nullable: true })
  legacyCode: string;
}
