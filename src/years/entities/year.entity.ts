import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column, Unique } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Paginated } from '../../common/pages';

import { UserBaseEntity } from 'src/users/entities/user-base-entity';

@ObjectType()
@Entity('year')
@Unique(['year'])
export class YearEntity extends UserBaseEntity {
  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 4, nullable: false })
  @IsOptional()
  year?: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ name: 'date_begin', nullable: true })
  @IsOptional()
  dateBegin?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ name: 'date_end', nullable: true })
  @IsOptional()
  dateEnd?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ name: 'date_module1', nullable: true })
  @IsOptional()
  dateModule1?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ name: 'date_module2', nullable: true })
  @IsOptional()
  dateModule2?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ name: 'date_module3', nullable: true })
  @IsOptional()
  dateModule3?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ name: 'date_module4', nullable: true })
  @IsOptional()
  dateModule4?: Date;
}

@ObjectType()
export class YearPaginated extends Paginated<YearEntity>(YearEntity) {}
