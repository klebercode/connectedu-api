import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/base-entity';
import { IsOptional } from 'class-validator';

@Entity('group')
export class Group extends BaseEntity {
  @Column({ length: 100, nullable: false })
  description: string;

  @Column()
  @IsOptional()
  tipo?: boolean;

  @Column({ nullable: true })
  date_begin?: Date;

  @Column({ nullable: true })
  @IsOptional()
  date_end?: Date;
}
