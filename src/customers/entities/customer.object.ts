import { Column, Entity, Unique } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BasicFields } from '../../common/types/basicfields';

@Entity()
@ObjectType()
@Unique(['host'])
export class Customer extends BasicFields {
  @Field()
  @Column()
  host: string;

  @Field()
  @Column()
  domain: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ name: 'organization_id', nullable: true })
  organizationId?: number;
}
