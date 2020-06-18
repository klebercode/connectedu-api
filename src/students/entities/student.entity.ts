import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base-entity';
import { UserEntity } from '../../users/entities/user.entity';
import { IsOptional } from 'class-validator';

@ObjectType()
@Entity('student')
export class StudentEntity extends BaseEntity {
  @Field()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  endereco?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  bairro?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  cidade?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  image?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  usercreatedId?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  userupdatedId?: number;

  @Field(type => UserEntity, { nullable: true })
  @ManyToOne(type => UserEntity, { nullable: true })
  @JoinColumn({ name: 'usercreatedId' })
  @IsOptional()
  usercreated?: UserEntity;

  @Field(type => UserEntity, { nullable: true })
  @ManyToOne(type => UserEntity, { nullable: true })
  @JoinColumn({ name: 'userupdatedId' })
  @IsOptional()
  userupdated?: UserEntity;
}
