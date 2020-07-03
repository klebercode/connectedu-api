import { UseGuards, HttpException } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreatePermissionInput } from '../types/create-permission.input';
import { PermissionEntity } from '../entities/permission.object';
import { PermissionsService } from '../permissions.service';

@UseGuards(GqlAuthGuard)
@Resolver(of => PermissionEntity)
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Query(() => PermissionEntity, { name: 'permission' })
  async getPermission(@Args('id') id: number): Promise<PermissionEntity> {
    return await this.permissionsService.findOneById(id);
  }

  @Query(() => [PermissionEntity], { name: 'permissionAll' })
  async getPermissions(): Promise<PermissionEntity[]> {
    return await this.permissionsService.findAll();
  }

  @Mutation(() => PermissionEntity, { name: 'permissionCreate' })
  async createPermission(
    @Args('input') input: CreatePermissionInput,
  ): Promise<PermissionEntity> {
    try {
      const obj = await this.permissionsService.create({ ...input });
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => PermissionEntity, { name: 'permissionUpdate' })
  async updatePermission(
    @Args('id') id: number,
    @Args('input') input: CreatePermissionInput,
  ): Promise<PermissionEntity> {
    try {
      const obj = await this.permissionsService.update(id, { ...input });
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'permissionDelete' })
  async deletePermission(@Args('id') id: number): Promise<boolean> {
    await this.permissionsService.remove(id);
    const obj = await this.permissionsService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }
}
