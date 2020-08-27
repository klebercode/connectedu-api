import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';
import { MyContext } from '../../common/types/mycontext';

import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';

import { StateEntity, StatePaginated } from '../entities/state.object';
import { StatesService } from '../states.service';
import { CreateStateInput } from '../types/create-state.input';
import { UpdateStateInput } from '../types/update-state.input';

import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { ResolverPublic } from '../../common/resolvers/public.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
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

  @Query(() => StatePaginated, { name: 'statePages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<StatePaginated> {
    return super.getPagenated(pagination);
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
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateStateInput,
  ): Promise<StateEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [StateEntity], { name: 'stateCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateStateInput] })
    input: [CreateStateInput],
  ): Promise<StateEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'stateDelete' })
  async delete(
    @Context() context: MyContext,
    @Args('id') id: number,
  ): Promise<boolean> {
    return super.delete(context, id);
  }

  @Mutation(() => Boolean, { name: 'stateDeleteMany' })
  async deleteMany(
    @Context() context: MyContext,
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(context, ids);
  }

  @Mutation(() => StateEntity, { name: 'stateUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateStateInput,
  ): Promise<StateEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'stateUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateStateInput] })
    input: [UpdateStateInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }
}
