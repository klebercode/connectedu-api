import { Field, ObjectType } from '@nestjs/graphql';
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

  @Field({ name: 'dateBegin', nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  date_begin?: Date;

  @Field()
  @Field({ name: 'dateEnd', nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  date_end?: Date;
}
