import { UseGuards, UseFilters } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';
import { MyContext } from '../../common/types/mycontext';

import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Context,
  Parent,
} from '@nestjs/graphql';

import { CityEntity, CityPaginated } from '../entities/city.object';
import { CitiesService } from '../cities.service';
import { CreateCityInput } from '../types/create-city.input';
import { UpdateCityInput } from '../types/update-city.input';

import { StatesService } from '../../states/states.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverPublic } from '../../common/resolvers/public.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => CityEntity)
@UseFilters(HttpExceptionFilter)
export class CitiesResolver extends ResolverPublic<
  CityEntity,
  CreateCityInput,
  UpdateCityInput
> {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly statesService: StatesService,
  ) {
    super('Cidade', citiesService);
  }

  @Query(() => CityEntity, { name: 'city' })
  async get(@Args('id') id: number): Promise<CityEntity> {
    return super.get(id);
  }

  @Query(() => [CityEntity], { name: 'cityAll' })
  async getAll(): Promise<CityEntity[]> {
    return super.getAll();
  }

  @Query(() => CityPaginated, { name: 'cityPages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<CityPaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [CityEntity], { name: 'cityMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<CityEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => CityEntity, { name: 'cityCreate' })
  async create(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => CreateCityInput })
    input: CreateCityInput,
  ): Promise<CityEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [CityEntity], { name: 'cityCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateCityInput] })
    input: [CreateCityInput],
  ): Promise<CityEntity[]> {
    return super.createMany(context, input);
  }
  context;

  @Mutation(() => Boolean, { name: 'cityDelete' })
  async delete(
    @Context() context: MyContext,
    @Args('id') id: number,
  ): Promise<boolean> {
    return super.delete(context, id);
  }

  @Mutation(() => Boolean, { name: 'cityDeleteMany' })
  async deleteMany(
    @Context() context: MyContext,
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(context, ids);
  }

  @Mutation(() => CityEntity, { name: 'cityUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateCityInput,
  ): Promise<CityEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'cityUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateCityInput] })
    input: [UpdateCityInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('state')
  async state(@Parent() city: CityEntity): Promise<any> {
    const id = city.stateId;
    if (!id) {
      return null;
    }
    try {
      return this.statesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Estado');
    }
  }
}
