import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PermissionEntity } from '../entities/permission.object';
import { PermissionsService } from '../permissions.service';
import { CreatePermissionInput } from '../types/create-permission.input';
import { UpdatePermissionInput } from '../types/update-permission.input';

import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard)
@Resolver(of => PermissionEntity)
@UseFilters(HttpExceptionFilter)
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) {}
  private nameApp = 'Permissões';

  @Query(() => PermissionEntity, { name: 'permission' })
  async get(@Args('id') id: number): Promise<PermissionEntity> {
    try {
      const obj = await this.permissionsService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [PermissionEntity], { name: 'permissionMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<PermissionEntity[]> {
    try {
      const obj = await this.permissionsService.findByIds(ids);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'getMany', this.nameApp);
    }
  }

  @Query(() => [PermissionEntity], { name: 'permissionAll' })
  async getAll(): Promise<PermissionEntity[]> {
    try {
      return this.permissionsService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => PermissionEntity, { name: 'permissionCreate' })
  async create(
    @Args('input') input: CreatePermissionInput,
  ): Promise<PermissionEntity> {
    try {
      const obj = await this.permissionsService.create({ ...input });
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => [PermissionEntity], { name: 'permissionCreateMany' })
  async createMany(
    @Args({ name: 'input', type: () => [CreatePermissionInput] })
    input: [CreatePermissionInput],
  ): Promise<PermissionEntity[]> {
    try {
      return await this.permissionsService.createMany(input);
    } catch (error) {
      CustomException.catch(error, 'createMany', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'permissionDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    try {
      const obj = await this.permissionsService.remove(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'permissionDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    try {
      const obj = await this.permissionsService.removeMany(ids);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'deleteMany', this.nameApp);
    }
  }

  @Mutation(() => PermissionEntity, { name: 'permissionUpdate' })
  async update(
    @Args('id') id: number,
    @Args('input') input: UpdatePermissionInput,
  ): Promise<PermissionEntity> {
    try {
      const obj = await this.permissionsService.update(id, { ...input });
      return obj;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }
}
