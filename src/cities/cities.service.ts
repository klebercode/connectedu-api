import { Injectable, ConflictException, GoneException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicePublic } from '../common/services/public.service';

import { CityEntity } from './entities/city.object';
import { CreateCityInput } from './types/create-city.input';
import { UpdateCityInput } from './types/update-city.input';

@Injectable()
export class CitiesService extends ServicePublic<
  CityEntity,
  CreateCityInput,
  UpdateCityInput
> {
  constructor(
    @InjectRepository(CityEntity)
    private repository: Repository<CityEntity>,
  ) {
    super(repository, CityEntity);
  }
}
