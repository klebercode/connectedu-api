import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { StateEntity } from '../entities/state.object';
import { StatesService } from '../states.service';
import { CreateStateInput } from '../types/create-state.input';
import { UpdateStateInput } from '../types/update-state.input';

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { ResolverPublic } from '../../common/resolvers/public.resolver';

@UseGuards(GqlAuthGuard)
@Resolver(of => StateEntity)
@UseFilters(HttpExceptionFilter)
export class StatesResolver extends ResolverPublic<
  StateEntity,
  CreateStateInput,
  UpdateStateInput
> {
  constructor(private readonly statesService: StatesService) {
    super('Estado', statesService);
  }

  @Query(() => StateEntity, { name: 'state' })
  async get(@Args('id') id: number): Promise<StateEntity> {
    return super.get(id);
  }

  @Query(() => [StateEntity], { name: 'stateMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<StateEntity[]> {
    return super.getMany(ids);
  }

  @Query(() => [StateEntity], { name: 'stateAll' })
  async getAll(): Promise<StateEntity[]> {
    return super.getAll();
  }

  @Mutation(() => StateEntity, { name: 'stateCreate' })
  async create(@Args('input') input: CreateStateInput): Promise<StateEntity> {
    return super.create(input);
  }

  @Mutation(() => [StateEntity], { name: 'stateCreateMany' })
  async createMany(
    @Args({ name: 'input', type: () => [CreateStateInput] })
    input: [CreateStateInput],
  ): Promise<StateEntity[]> {
    return super.createMany(input);
  }

  @Mutation(() => Boolean, { name: 'stateDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'stateDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => StateEntity, { name: 'stateUpdate' })
  async update(
    @Args('id') id: number,
    @Args('input') input: UpdateStateInput,
  ): Promise<StateEntity> {
    return super.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'stateUpdateMany' })
  async updateMany(
    @Args({ name: 'input', type: () => [UpdateStateInput] })
    input: [UpdateStateInput],
  ): Promise<boolean> {
    return super.updateMany(input);
  }
}
