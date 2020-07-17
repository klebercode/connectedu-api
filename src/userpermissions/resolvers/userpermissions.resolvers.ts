import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Context,
  Parent,
} from '@nestjs/graphql';

import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';
import { CreateUserPermissionInput } from '../types/create-userpermission.input';
import { MyContext } from '../../common/types/myContext';
import { UserPermissionEntity } from '../entities/userpermission.entity';
import { UserPermissionsService } from '../userpermissions.service';
import { UsersService } from '../../users/users.service';
import { PermissionsService } from '../../permissions/permissions.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => UserPermissionEntity)
@UseFilters(HttpExceptionFilter)
export class UserPermissionsResolver {
  constructor(
    private readonly userPermissionsService: UserPermissionsService,
    private readonly usersService: UsersService,
    private readonly permissionsService: PermissionsService,
  ) {}
  private nameApp = 'Permissões Usuário';

  @Query(() => UserPermissionEntity, { name: 'userPermission' })
  async getUserPermission(
    @Args('id') id: number,
  ): Promise<UserPermissionEntity> {
    try {
      const obj = await this.userPermissionsService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [UserPermissionEntity], { name: 'userPermissionAll' })
  async getUserPermissions(): Promise<UserPermissionEntity[]> {
    try {
      return this.userPermissionsService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => UserPermissionEntity, { name: 'userPermissionCreate' })
  async createUserPermission(
    @Context() context: MyContext,
    @Args('input') input: CreateUserPermissionInput,
  ): Promise<UserPermissionEntity> {
    try {
      const { user } = context.req;
      const obj = await this.userPermissionsService.create(input, user['id']);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'userPermissionDelete' })
  async deleteUserPermission(@Args('id') id: number): Promise<boolean> {
    try {
      await this.userPermissionsService.remove(id);
      const obj = await this.userPermissionsService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => UserPermissionEntity, { name: 'userPermissionUpdate' })
  async updateUserPermission(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreateUserPermissionInput,
  ): Promise<UserPermissionEntity> {
    try {
      const { user } = context.req;
      const obj = await this.userPermissionsService.update(
        id,
        { ...input },
        user['id'],
      );
      return obj;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

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
