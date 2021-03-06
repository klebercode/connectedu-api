import { Field, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../base-entity';
import { IsOptional } from 'class-validator';

@ObjectType()
@Entity('group')
export class GroupEntity extends BaseEntity {
  @Field()
  @Column({ length: 100, nullable: false })
  description: string;

  @Field()
  @Column()
  @IsOptional()
  tipo?: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ name: 'date_begin', nullable: true })
  @IsOptional()
  dateBegin?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({ name: 'date_end', nullable: true })
  @IsOptional()
  dateEnd?: Date;
}
