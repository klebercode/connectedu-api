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

import { MyContext } from '../../common/types/mycontext';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';

import { UserEntity, UserPaginated } from '../entities/user.entity';
import { UsersService } from '../users.service';
import { CreateUsersInput } from '../types/create-user.input';
import { UpdateUsersInput } from '../types/update-user.input';

import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => UserEntity)
@UseFilters(HttpExceptionFilter)
export class UsersResolver extends ResolverDefault<
  UserEntity,
  CreateUsersInput,
  UpdateUsersInput
> {
  constructor(private readonly usersService: UsersService) {
    super('Usuário', usersService);
  }

  @Query(() => UserEntity, { name: 'user' })
  async get(@Args('id') id: number): Promise<UserEntity> {
    return super.get(id);
  }

  @Query(() => [UserEntity], { name: 'userAll' })
  async getAll(): Promise<UserEntity[]> {
    return super.getAll();
  }

  @Query(() => UserPaginated, { name: 'userPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<UserPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [UserEntity], { name: 'userMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<UserEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => UserEntity, { name: 'userCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateUsersInput,
  ): Promise<UserEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [UserEntity], { name: 'userCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateUsersInput] })
    input: [CreateUsersInput],
  ): Promise<UserEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'userDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'userDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => UserEntity, { name: 'userUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateUsersInput,
  ): Promise<UserEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'userUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateUsersInput] })
    input: [UpdateUsersInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
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

  // **************************************  Resolucao de Campos

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
