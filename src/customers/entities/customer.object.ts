import { Column, Entity, Unique } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BasicFields } from '../../common/types/basicfields';

@Entity()
@ObjectType()
@Unique(['host'])
@Unique(['domain'])
export class Customer extends BasicFields {
  @Field({ nullable: false })
  @Column({ length: 100, nullable: true })
  host: string;

  @Field({ nullable: false })
  @Column({ length: 100, nullable: true })
  domain: string;

  @Field({ nullable: false })
  @Column({ length: 100, nullable: true })
  name: string;

  @Field({ nullable: false })
  @Column({ name: 'organization_id', nullable: false })
  organizationId?: number;
}
