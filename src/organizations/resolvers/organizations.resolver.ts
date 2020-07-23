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
  async get(@Args('id') id: number): Promise<OrganizationEntity> {
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

  @Query(() => [OrganizationEntity], { name: 'organizationMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<OrganizationEntity[]> {
    try {
      const obj = await this.organizationsService.findByIds(ids);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'getMany', this.nameApp);
    }
  }

  @Query(() => [OrganizationEntity], { name: 'organizationAll' })
  async getAll(): Promise<OrganizationEntity[]> {
    try {
      return this.organizationsService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => OrganizationEntity, { name: 'organizationCreate' })
  async create(
    @Args('input') input: CreateOrganizationInput,
  ): Promise<OrganizationEntity> {
    try {
      const obj = await this.organizationsService.create({ ...input });
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => [OrganizationEntity], { name: 'organizationCreateMany' })
  async createMany(
    @Args({ name: 'input', type: () => [CreateOrganizationInput] })
    input: [CreateOrganizationInput],
  ): Promise<OrganizationEntity[]> {
    try {
      return await this.organizationsService.createMany(input);
    } catch (error) {
      CustomException.catch(error, 'createMany', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'organizationDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    try {
      const obj = await this.organizationsService.remove(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'organizationDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    try {
      const obj = await this.organizationsService.removeMany(ids);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'deleteMany', this.nameApp);
    }
  }

  @Mutation(() => OrganizationEntity, { name: 'organizationUpdate' })
  async update(
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
