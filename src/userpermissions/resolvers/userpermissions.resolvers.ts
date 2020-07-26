import { UseGuards, UseFilters } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Context,
  Parent,
} from '@nestjs/graphql';

import { MyContext } from '../../common/types/myContext';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';

import {
  UserPermissionEntity,
  UserPermissionPaginated,
} from '../entities/userpermission.entity';
import { UserPermissionsService } from '../userpermissions.service';
import { CreateUserPermissionInput } from '../types/create-userpermission.input';
import { UpdateUserPermissionInput } from '../types/update-userpermission.input';

import { UsersService } from '../../users/users.service';
import { PermissionsService } from '../../permissions/permissions.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => UserPermissionEntity)
@UseFilters(HttpExceptionFilter)
export class UserPermissionsResolver extends ResolverDefault<
  UserPermissionEntity,
  CreateUserPermissionInput,
  UpdateUserPermissionInput
> {
  constructor(
    private readonly userPermissionsService: UserPermissionsService,
    private readonly usersService: UsersService,
    private readonly permissionsService: PermissionsService,
  ) {
    super('Permissões Usuário', userPermissionsService);
  }

  @Query(() => UserPermissionEntity, { name: 'userPermission' })
  async get(@Args('id') id: number): Promise<UserPermissionEntity> {
    return super.get(id);
  }

  @Query(() => [UserPermissionEntity], { name: 'userPermissionAll' })
  async getAll(): Promise<UserPermissionEntity[]> {
    return super.getAll();
  }

  @Query(() => UserPermissionPaginated, { name: 'userPermissionPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<UserPermissionPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [UserPermissionEntity], { name: 'userPermissionMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<UserPermissionEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => UserPermissionEntity, { name: 'userPermissionCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateUserPermissionInput,
  ): Promise<UserPermissionEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [UserPermissionEntity], { name: 'userPermissionCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateUserPermissionInput] })
    input: [CreateUserPermissionInput],
  ): Promise<UserPermissionEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'userPermissionDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'userPermissionDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => UserPermissionEntity, { name: 'userPermissionUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateUserPermissionInput,
  ): Promise<UserPermissionEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'userPermissionUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateUserPermissionInput] })
    input: [UpdateUserPermissionInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('user')
  async user(@Parent() userPermission: UserPermissionEntity): Promise<any> {
    const id = userPermission.userId;
    if (!id) {
      return null;
    }

    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }

  @ResolveField('code')
  async code(@Parent() userPermission: UserPermissionEntity): Promise<any> {
    const id = userPermission.codeId;
    if (!id) {
      return null;
    }

    try {
      return this.permissionsService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Permissão');
    }
  }

  @ResolveField(() => UserEntity)
  async userCreated(
    @Parent() userPermission: UserPermissionEntity,
  ): Promise<any> {
    const id = userPermission.userCreatedId;
    if (!id) {
      return null;
    }

    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }

  @ResolveField(() => UserEntity)
  async userUpdated(@Parent() userPermission: UserPermissionEntity) {
    const id = userPermission.userUpdatedId;
    if (!id) {
      return null;
    }

    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }
}
