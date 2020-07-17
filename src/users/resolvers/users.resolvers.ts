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
import { CreateUsersInput } from '../types/create-user.input';
import { UpdateUsersInput } from '../types/update-user.input';
import { MyContext } from '../../common/types/myContext';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../users.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => UserEntity)
@UseFilters(HttpExceptionFilter)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  private nameApp = 'Usuário';

  @Query(() => UserEntity, { name: 'user' })
  async getUser(@Args('id') id: number): Promise<UserEntity> {
    try {
      const obj = await this.usersService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [UserEntity], { name: 'userAll' })
  async getUsers(): Promise<UserEntity[]> {
    try {
      return this.usersService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => UserEntity, { name: 'userCreate' })
  async createUser(
    @Context() context: MyContext,
    @Args('input') input: CreateUsersInput,
  ): Promise<UserEntity> {
    try {
      const { user } = context.req;
      const obj = await this.usersService.create(input, user['id']);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'userDelete' })
  async deleteUser(@Args('id') id: number): Promise<boolean> {
    try {
      await this.usersService.remove(id);
      const obj = await this.usersService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => UserEntity, { name: 'userUpdate' })
  async updateUser(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateUsersInput,
  ): Promise<UserEntity> {
    try {
      const { user } = context.req;
      const obj = await this.usersService.update(id, { ...input }, user['id']);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'userUpdatePassword' })
  async updatePasswordUser(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: string,
  ): Promise<boolean> {
    try {
      const { user } = context.req;
      const ret = await this.usersService.updatePassword(id, input, user['id']);
      return ret;
    } catch (error) {
      CustomException.catch(error, 'update', 'Password Usuário');
    }
  }

  @ResolveField('userCreated')
  async userCreated(@Parent() user: UserEntity): Promise<any> {
    const id = user.userCreatedId;
    if (!id) {
      return null;
    }

    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }

  @ResolveField('userUpdated')
  async userUpdated(@Parent() user: UserEntity) {
    const id = user.userUpdatedId;
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
