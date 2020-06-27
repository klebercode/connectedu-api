import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { OrganizationEntity } from '../../organizations/entities/organization.object';

@InputType()
export class CreateCustomerInput {
  @Field()
  host: string;

  @Field()
  domain: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  organizationId?: number;
}
