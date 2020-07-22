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
  async getPermission(@Args('id') id: number): Promise<PermissionEntity> {
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

  @Query(() => [PermissionEntity], { name: 'permissionAll' })
  async getPermissions(): Promise<PermissionEntity[]> {
    try {
      return this.permissionsService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => PermissionEntity, { name: 'permissionCreate' })
  async createPermission(
    @Args('input') input: CreatePermissionInput,
  ): Promise<PermissionEntity> {
    try {
      const obj = await this.permissionsService.create({ ...input });
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'permissionDelete' })
  async deletePermission(@Args('id') id: number): Promise<boolean> {
    try {
      await this.permissionsService.remove(id);
      const obj = await this.permissionsService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => PermissionEntity, { name: 'permissionUpdate' })
  async updatePermission(
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
