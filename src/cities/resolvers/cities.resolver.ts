import { UseGuards, UseFilters } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
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

@UseGuards(GqlAuthGuard)
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
    @Args({ name: 'input', type: () => CreateCityInput })
    input: CreateCityInput,
  ): Promise<CityEntity> {
    return super.create(input);
  }

  @Mutation(() => [CityEntity], { name: 'cityCreateMany' })
  async createMany(
    @Args({ name: 'input', type: () => [CreateCityInput] })
    input: [CreateCityInput],
  ): Promise<CityEntity[]> {
    return super.createMany(input);
  }

  @Mutation(() => Boolean, { name: 'cityDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'cityDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => CityEntity, { name: 'cityUpdate' })
  async update(
    @Args('id') id: number,
    @Args('input') input: UpdateCityInput,
  ): Promise<CityEntity> {
    return super.update(id, input);
  }

  @Mutation(() => Boolean, { name: 'cityUpdateMany' })
  async updateMany(
    @Args({ name: 'input', type: () => [UpdateCityInput] })
    input: [UpdateCityInput],
  ): Promise<boolean> {
    return super.updateMany(input);
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
