import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/shared/jwt-authgq.gaurd';

import { NewUsers } from '../inputs/new-user.input';
import { User } from '../models/user.model';
import { UsersService } from '../shared/users.service';

@UseGuards(GqlAuthGuard)
@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(returns => User)
  async userId(@Args('id') id: number): Promise<User> {
    const obj = await this.userService.findOneById(id);
    if (!obj) {
      throw new NotFoundException(id);
    }
    return obj;
  }

  @Query(returns => [User])
  async userAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation(returns => User)
  async userCreate(@Args('newData') newData: NewUsers): Promise<User> {
    const obj = await this.userService.create({ ...newData });
    return obj;
  }

  @Mutation(returns => Boolean)
  async userDelete(@Args('id') id: number): Promise<Boolean> {
    await this.userService.remove(id);
    const obj = await this.userService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }

  @Mutation(returns => User)
  async userUpdate(
    @Args('id') id: number,
    @Args('updateData') updateData: NewUsers,
  ): Promise<User> {
    const obj = await this.userService.update(id, updateData);
    return obj;
  }
}
