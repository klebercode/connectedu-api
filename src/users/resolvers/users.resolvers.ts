import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';
import { CreateUsersInput } from '../types/create-user.input';
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
    @Args('createData') createData: CreateUsersInput,
  ): Promise<UserEntity> {
    const obj = await this.usersService.create({ ...createData });
    return obj;
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
    @Args('id') id: number,
    @Args('updateData') updateData: CreateUsersInput,
  ): Promise<UserEntity> {
    const obj = await this.usersService.update(id, { ...updateData });
    return obj;
  }
}
