import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { StateEntity } from '../entities/state.object';
import { StatesService } from '../states.service';
import { CreateStateInput } from '../types/create-state.input';
import { UpdateStateInput } from '../types/update-state.input';

import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard)
@Resolver(of => StateEntity)
@UseFilters(HttpExceptionFilter)
export class StatesResolver {
  constructor(private readonly statesService: StatesService) {}
  private nameApp = 'Estado';

  @Query(() => StateEntity, { name: 'state' })
  async get(@Args('id') id: number): Promise<StateEntity> {
    try {
      const obj = await this.statesService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [StateEntity], { name: 'stateMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<StateEntity[]> {
    try {
      const obj = await this.statesService.findByIds(ids);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'getMany', this.nameApp);
    }
  }

  @Query(() => [StateEntity], { name: 'stateAll' })
  async getAll(): Promise<StateEntity[]> {
    try {
      return this.statesService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => StateEntity, { name: 'stateCreate' })
  async create(@Args('input') input: CreateStateInput): Promise<StateEntity> {
    try {
      const obj = await this.statesService.create({ ...input });
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => [StateEntity], { name: 'stateCreateMany' })
  async createMany(
    @Args({ name: 'input', type: () => [CreateStateInput] })
    input: [CreateStateInput],
  ): Promise<StateEntity[]> {
    try {
      return await this.statesService.createMany(input);
    } catch (error) {
      CustomException.catch(error, 'createMany', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'stateDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    try {
      const obj = await this.statesService.remove(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'stateDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    try {
      const obj = await this.statesService.removeMany(ids);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'deleteMany', this.nameApp);
    }
  }

  @Mutation(() => StateEntity, { name: 'stateUpdate' })
  async update(
    @Args('id') id: number,
    @Args('input') input: UpdateStateInput,
  ): Promise<StateEntity> {
    try {
      const obj = await this.statesService.update(id, { ...input });
      return obj;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }
}
