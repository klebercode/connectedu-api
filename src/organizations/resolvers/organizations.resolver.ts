import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import {
  OrganizationEntity,
  OrganizationPaginated,
} from '../entities/organization.object';
import { OrganizationsService } from '../organizations.service';
import { CreateOrganizationInput } from '../types/create-organization.input';
import { UpdateOrganizationInput } from '../types/update-organization.input';

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { ResolverPublic } from '../../common/resolvers/public.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard)
@Resolver(of => OrganizationEntity)
@UseFilters(HttpExceptionFilter)
export class OrganizationsResolver extends ResolverPublic<
  OrganizationEntity,
  CreateOrganizationInput,
  UpdateOrganizationInput
> {
  constructor(private readonly organizationsService: OrganizationsService) {
    super('Organização', organizationsService);
  }

  @Query(() => OrganizationEntity, { name: 'organization' })
  async get(@Args('id') id: number): Promise<OrganizationEntity> {
    return super.get(id);
  }

  @Query(() => [OrganizationEntity], { name: 'organizationAll' })
  async getAll(): Promise<OrganizationEntity[]> {
    return super.getAll();
  }

  @Query(() => OrganizationPaginated, { name: 'organizationPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<OrganizationPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [OrganizationEntity], { name: 'organizationMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<OrganizationEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => OrganizationEntity, { name: 'organizationCreate' })
  async create(
    @Args('input') input: CreateOrganizationInput,
  ): Promise<OrganizationEntity> {
    return super.create(input);
  }

  @Mutation(() => [OrganizationEntity], { name: 'organizationCreateMany' })
  async createMany(
    @Args({ name: 'input', type: () => [CreateOrganizationInput] })
    input: [CreateOrganizationInput],
  ): Promise<OrganizationEntity[]> {
    return super.createMany(input);
  }

  @Mutation(() => Boolean, { name: 'organizationDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'organizationDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => OrganizationEntity, { name: 'organizationUpdate' })
  async update(
    @Args('id') id: number,
    @Args('input') input: UpdateOrganizationInput,
  ): Promise<OrganizationEntity> {
    return super.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'organizationUpdateMany' })
  async updateMany(
    @Args({ name: 'input', type: () => [UpdateOrganizationInput] })
    input: [UpdateOrganizationInput],
  ): Promise<boolean> {
    return super.updateMany(input);
  }
}
