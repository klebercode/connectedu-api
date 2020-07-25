import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';
import { IsOptional } from 'class-validator';
import { UserBaseEntity } from 'src/users/entities/user-base-entity';
import { Paginated } from '../../common/types/paginated';

@ObjectType()
@Entity('subject')
export class SubjectEntity extends UserBaseEntity {
  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: false })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 15, nullable: true })
  @IsOptional()
  abbreviation?: string;

  @Field({ nullable: true })
  @Column({
    name: 'description_minutes',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  @IsOptional()
  descriptionMinutes?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  @IsOptional()
  status?: boolean;
}

@ObjectType()
export class SubjectEntityPaginated extends Paginated(SubjectEntity) {}
