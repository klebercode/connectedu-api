import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { CreateCityInput } from '../types/create-city.input';
import { CityEntity } from '../entities/city.object';
import { CitiesService } from '../cities.service';
import { StatesService } from '../../states/states.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard)
@Resolver(of => CityEntity)
@UseFilters(HttpExceptionFilter)
export class CitiesResolver {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly statesService: StatesService,
  ) {}
  private nameApp = 'Cidade';

  @Query(() => CityEntity, { name: 'city' })
  async get(@Args('id') id: number): Promise<CityEntity> {
    try {
      const obj = await this.citiesService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [CityEntity], { name: 'cityMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<CityEntity[]> {
    try {
      const obj = await this.citiesService.findByIds(ids);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'getMany', this.nameApp);
    }
  }

  @Query(() => [CityEntity], { name: 'cityAll' })
  async getAll(): Promise<CityEntity[]> {
    try {
      return this.citiesService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => CityEntity, { name: 'cityCreate' })
  async create(@Args('input') input: CreateCityInput): Promise<CityEntity> {
    try {
      const obj = await this.citiesService.create({ ...input });
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => [CityEntity], { name: 'cityCreateMany' })
  async createMany(
    @Args({ name: 'input', type: () => [CreateCityInput] })
    input: [CreateCityInput],
  ): Promise<CityEntity[]> {
    try {
      return await this.citiesService.createMany(input);
    } catch (error) {
      CustomException.catch(error, 'createMany', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'cityDelete' })
  async delete(@Args('id') id: number): Promise<boolean> {
    try {
      const obj = await this.citiesService.remove(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'cityDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    try {
      const obj = await this.citiesService.removeMany(ids);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'deleteMany', this.nameApp);
    }
  }

  @Mutation(() => CityEntity, { name: 'cityUpdate' })
  async update(
    @Args('id') id: number,
    @Args('input') input: CreateCityInput,
  ): Promise<CityEntity> {
    try {
      const obj = await this.citiesService.update(id, { ...input });
      return obj;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
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
