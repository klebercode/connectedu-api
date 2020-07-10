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
import { CreateUsersInput } from '../types/create-user.input';
import { UpdateUsersInput } from '../types/update-user.input';
import { MyContext } from '../../common/types/myContext';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../users.service';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserEntity, { name: 'user' })
  async getUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.usersService.findOneById(id);
  }

  @Query(() => [UserEntity], { name: 'userAll' })
  async getUsers(): Promise<UserEntity[]> {
    return this.usersService.findAll();
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
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'userDelete' })
  async deleteUser(@Args('id') id: number): Promise<boolean> {
    await this.usersService.remove(id);
    const obj = await this.usersService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
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
    } catch (exception) {
      throw new HttpException(exception.message, 409);
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
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @ResolveField('userCreated')
  async userCreated(@Parent() user: UserEntity): Promise<any> {
    const id = user.userCreatedId;
    if (!id) {
      return null;
    }
    return this.usersService.findOneById(id);
  }

  @ResolveField('userUpdated')
  async userUpdated(@Parent() user: UserEntity) {
    const id = user.userUpdatedId;
    if (!id) {
      return null;
    }
    return this.usersService.findOneById(id);
  }
}
