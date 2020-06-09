import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/shared/jwt-authgq.gaurd';

import { NewGroup } from '../inputs/new-group.input';
import { Group } from '../models/group.model';
import { GroupService } from '../shared/group.service';

@UseGuards(GqlAuthGuard)
@Resolver(of => Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Query(returns => Group)
  async groupId(@Args('id') id: number): Promise<Group> {
    const obj = await this.groupService.findOneById(id);
    if (!obj) {
      throw new NotFoundException(id);
    }
    return obj;
  }

  @Query(returns => [Group])
  async groupAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @Mutation(returns => Group)
  async groupCreate(@Args('newData') newData: NewGroup): Promise<Group> {
    const obj = await this.groupService.create({ ...newData });
    return obj;
  }

  @Mutation(returns => Boolean)
  async groupDelete(@Args('id') id: number): Promise<Boolean> {
    await this.groupService.remove(id);
    const obj = await this.groupService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }

  @Mutation(returns => Group)
  async groupUpdate(
    @Args('id') id: number,
    @Args('updateData') updateData: NewGroup,
  ): Promise<Group> {
    const obj = await this.groupService.update(id, { ...updateData });
    return obj;
  }
}
