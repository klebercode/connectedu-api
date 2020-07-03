import { UseGuards, HttpException } from '@nestjs/common';
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

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => UserPermissionEntity)
export class UserPermissionsResolver {
  constructor(
    private readonly userPermissionsService: UserPermissionsService,
    private readonly usersService: UsersService,
    private readonly permissionsService: PermissionsService,
  ) {}

  @Query(() => UserPermissionEntity, { name: 'userPermission' })
  async getUserPermission(
    @Args('id') id: number,
  ): Promise<UserPermissionEntity> {
    return await this.userPermissionsService.findOneById(id);
  }

  @Query(() => [UserPermissionEntity], { name: 'userPermissionAll' })
  async getUserPermissions(): Promise<UserPermissionEntity[]> {
    return this.userPermissionsService.findAll();
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
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'userPermissionDelete' })
  async deleteUserPermission(@Args('id') id: number): Promise<boolean> {
    await this.userPermissionsService.remove(id);
    const obj = await this.userPermissionsService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
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
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @ResolveField('user')
  async user(@Parent() userPermission: UserPermissionEntity): Promise<any> {
    const id = userPermission.userId;
    return this.usersService.findOneById(id);
  }

  @ResolveField('code')
  async code(@Parent() userPermission: UserPermissionEntity): Promise<any> {
    const id = userPermission.codeId;
    return this.permissionsService.findOneById(id);
  }

  @ResolveField('userCreated')
  async userCreated(
    @Parent() userPermission: UserPermissionEntity,
  ): Promise<any> {
    const id = userPermission.userCreatedId;
    return this.userPermissionsService.findOneById(id);
  }

  @ResolveField('userUpdated')
  async userUpdated(@Parent() userPermission: UserPermissionEntity) {
    const id = userPermission.userUpdatedId;
    return this.userPermissionsService.findOneById(id);
  }
}
