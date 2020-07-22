import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateOrganizationInput } from '../types/create-organization.input';
import { UpdateOrganizationInput } from '../types/update-organization.input';
import { OrganizationEntity } from '../entities/organization.object';
import { OrganizationsService } from '../organizations.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard)
@Resolver(of => OrganizationEntity)
@UseFilters(HttpExceptionFilter)
export class OrganizationsResolver {
  constructor(private readonly organizationsService: OrganizationsService) {}
  private nameApp = 'Organização';

  @Query(() => OrganizationEntity, { name: 'organization' })
  async getOrganization(@Args('id') id: number): Promise<OrganizationEntity> {
    try {
      const obj = await this.organizationsService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [OrganizationEntity], { name: 'organizationAll' })
  async getOrganizations(): Promise<OrganizationEntity[]> {
    try {
      return this.organizationsService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => OrganizationEntity, { name: 'organizationCreate' })
  async createOrganization(
    @Args('input') input: CreateOrganizationInput,
  ): Promise<OrganizationEntity> {
    try {
      const obj = await this.organizationsService.create({ ...input });
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'organizationDelete' })
  async deleteOrganization(@Args('id') id: number): Promise<boolean> {
    try {
      await this.organizationsService.remove(id);
      const obj = await this.organizationsService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => OrganizationEntity, { name: 'organizationUpdate' })
  async updateOrganization(
    @Args('id') id: number,
    @Args('input') input: UpdateOrganizationInput,
  ): Promise<OrganizationEntity> {
    try {
      const obj = await this.organizationsService.update(id, { ...input });
      return obj;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }
}
