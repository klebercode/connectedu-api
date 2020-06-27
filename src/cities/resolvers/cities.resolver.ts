import { UseGuards, HttpException } from '@nestjs/common';
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

@UseGuards(GqlAuthGuard)
@Resolver(of => CityEntity)
export class CitiesResolver {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly statesService: StatesService,
  ) {}

  @Query(() => CityEntity, { name: 'city' })
  async getCity(@Args('id') id: number): Promise<CityEntity> {
    return await this.citiesService.findOneById(id);
  }

  @Query(() => [CityEntity], { name: 'cityAll' })
  async getCities(): Promise<CityEntity[]> {
    return await this.citiesService.findAll();
  }

  @Mutation(() => CityEntity, { name: 'cityCreate' })
  async createCity(
    @Args('createData') createData: CreateCityInput,
  ): Promise<CityEntity> {
    try {
      const obj = await this.citiesService.create({ ...createData });
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => CityEntity, { name: 'cityUpdate' })
  async updateCity(
    @Args('id') id: number,
    @Args('updateData') updateData: CreateCityInput,
  ): Promise<CityEntity> {
    try {
      const obj = await this.citiesService.update(id, { ...updateData });
      return obj;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'cityDelete' })
  async deleteCity(@Args('id') id: number): Promise<boolean> {
    await this.citiesService.remove(id);
    const obj = await this.citiesService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }

  @ResolveField('state')
  async state(@Parent() city: CityEntity): Promise<any> {
    const id = city.stateId;
    return this.statesService.findOneById(id);
  }
}
