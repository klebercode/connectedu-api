import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';

import { CreateGroupInput } from '../types/create-group.input';
import { GroupEntity } from '../entities/group.entity';
import { GroupsService } from '../groups.service';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => GroupEntity)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Query(() => GroupEntity, { name: 'group' })
  async getGroup(@Args('id') id: number): Promise<GroupEntity> {
    return await this.groupsService.findOneById(id);
  }

  @Query(() => [GroupEntity], { name: 'groupAll' })
  async getGroups(): Promise<GroupEntity[]> {
    return await this.groupsService.findAll();
  }

  @Mutation(() => GroupEntity, { name: 'groupCreate' })
  async createGroup(
    @Args('createData') createData: CreateGroupInput,
  ): Promise<GroupEntity> {
    const obj = await this.groupsService.create({ ...createData });
    return obj;
  }

  @Mutation(() => GroupEntity, { name: 'groupUpdate' })
  async updateGroup(
    @Args('id') id: number,
    @Args('updateData') updateData: CreateGroupInput,
  ): Promise<GroupEntity> {
    const obj = await this.groupsService.update(id, { ...updateData });
    return obj;
  }

  @Mutation(() => Boolean, { name: 'groupDelete' })
  async deleteGroup(@Args('id') id: number): Promise<boolean> {
    await this.groupsService.remove(id);
    const obj = await this.groupsService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }
}
