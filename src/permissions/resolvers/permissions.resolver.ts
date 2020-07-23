import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { PermissionEntity } from '../entities/permission.object';
import { PermissionsService } from '../permissions.service';
import { CreatePermissionInput } from '../types/create-permission.input';
import { UpdatePermissionInput } from '../types/update-permission.input';

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { ResolverPublic } from '../../common/resolvers/public.resolver';

@UseGuards(GqlAuthGuard)
@Resolver(of => PermissionEntity)
@UseFilters(HttpExceptionFilter)
export class PermissionsResolver extends ResolverPublic<
  PermissionEntity,
  CreatePermissionInput,
  UpdatePermissionInput
> {
  constructor(private readonly permissionsService: PermissionsService) {
    super('Permissões', permissionsService);
  }

  @Query(() => PermissionEntity, { name: 'permission' })
  async get(@Args('id') id: number): Promise<PermissionEntity> {
    return super.get(id);
  }

  @Query(() => [PermissionEntity], { name: 'permissionMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<PermissionEntity[]> {
    return super.getMany(ids);
  }

  @Query(() => [PermissionEntity], { name: 'permissionAll' })
  async getAll(): Promise<PermissionEntity[]> {
    return super.getAll();
  }

  @Mutation(() => PermissionEntity, { name: 'permissionCreate' })
  async create(
    @Args('input') input: CreatePermissionInput,
  ): Promise<PermissionEntity> {
    return super.create(input);
  }

  @Mutation(() => [PermissionEntity], { name: 'permissionCreateMany' })
  async createMany(
    @Args({ name: 'input', type: () => [CreatePermissionInput] })
    input: [CreatePermissionInput],
  ): Promise<PermissionEntity[]> {
    return super.createMany(input);
  }

  @Mutation(() => Boolean, { name: 'permissionDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'permissionDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => PermissionEntity, { name: 'permissionUpdate' })
  async update(
    @Args('id') id: number,
    @Args('input') input: UpdatePermissionInput,
  ): Promise<PermissionEntity> {
    return super.update(id, input);
  }
}
