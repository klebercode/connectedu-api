import { UseGuards, HttpException } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateStateInput } from '../types/create-state.input';
import { StateEntity } from '../entities/state.object';
import { StatesService } from '../states.service';

@UseGuards(GqlAuthGuard)
@Resolver(of => StateEntity)
export class StatesResolver {
  constructor(private readonly statesService: StatesService) {}

  @Query(() => StateEntity, { name: 'state' })
  async getState(@Args('id') id: number): Promise<StateEntity> {
    return await this.statesService.findOneById(id);
  }

  @Query(() => [StateEntity], { name: 'stateAll' })
  async getStates(): Promise<StateEntity[]> {
    return await this.statesService.findAll();
  }

  @Mutation(() => StateEntity, { name: 'stateCreate' })
  async createState(
    @Args('createData') createData: CreateStateInput,
  ): Promise<StateEntity> {
    try {
      const obj = await this.statesService.create({ ...createData });
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => StateEntity, { name: 'stateUpdate' })
  async updateState(
    @Args('id') id: number,
    @Args('updateData') updateData: CreateStateInput,
  ): Promise<StateEntity> {
    try {
      const obj = await this.statesService.update(id, { ...updateData });
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'stateDelete' })
  async deleteState(@Args('id') id: number): Promise<boolean> {
    await this.statesService.remove(id);
    const obj = await this.statesService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }
}
