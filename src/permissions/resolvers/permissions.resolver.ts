import { UseGuards, UseFilters } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';
import { MyContext } from '../../common/types/mycontext';
import {
  PermissionEntity,
  PermissionPaginated,
} from '../entities/permission.object';
import { PermissionsService } from '../permissions.service';
import { CreatePermissionInput } from '../types/create-permission.input';
import { UpdatePermissionInput } from '../types/update-permission.input';

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { ResolverPublic } from '../../common/resolvers/public.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
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

  @Query(() => [PermissionEntity], { name: 'permissionAll' })
  async getAll(): Promise<PermissionEntity[]> {
    return super.getAll();
  }

  @Query(() => PermissionPaginated, { name: 'permissionPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<PermissionPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [PermissionEntity], { name: 'permissionMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<PermissionEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => PermissionEntity, { name: 'permissionCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreatePermissionInput,
  ): Promise<PermissionEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [PermissionEntity], { name: 'permissionCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreatePermissionInput] })
    input: [CreatePermissionInput],
  ): Promise<PermissionEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'permissionDelete' })
  async delete(
    @Context() context: MyContext,
    @Args('id') id: number,
  ): Promise<boolean> {
    return super.delete(context, id);
  }

  @Mutation(() => Boolean, { name: 'permissionDeleteMany' })
  async deleteMany(
    @Context() context: MyContext,
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(context, ids);
  }

  @Mutation(() => PermissionEntity, { name: 'permissionUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdatePermissionInput,
  ): Promise<PermissionEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'permissionUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdatePermissionInput] })
    input: [UpdatePermissionInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }
}
