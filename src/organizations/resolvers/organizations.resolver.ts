import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateOrganizationInput } from '../types/create-organization.input';
import { OrganizationEntity } from '../entities/organization.object';
import { OrganizationsService } from '../organizations.service';

@UseGuards(GqlAuthGuard)
@Resolver(of => OrganizationEntity)
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Query(() => OrganizationEntity, { name: 'organization' })
  async getOrganization(@Args('id') id: number): Promise<OrganizationEntity> {
    return await this.organizationsService.findOneById(id);
  }

  @Query(() => [OrganizationEntity], { name: 'organizationAll' })
  async getOrganizations(): Promise<OrganizationEntity[]> {
    return await this.organizationsService.findAll();
  }

  @Mutation(() => OrganizationEntity, { name: 'organizationCreate' })
  async createOrganization(
    @Args('input') input: CreateOrganizationInput,
  ): Promise<OrganizationEntity> {
    const obj = await this.organizationsService.create({ ...input });
    return obj;
  }

  @Mutation(() => OrganizationEntity, { name: 'organizationUpdate' })
  async updateOrganization(
    @Args('id') id: number,
    @Args('input') input: CreateOrganizationInput,
  ): Promise<OrganizationEntity> {
    const obj = await this.organizationsService.update(id, { ...input });
    return obj;
  }

  @Mutation(() => Boolean, { name: 'organizationDelete' })
  async deleteOrganization(@Args('id') id: number): Promise<boolean> {
    await this.organizationsService.remove(id);
    const obj = await this.organizationsService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }
}
