import { Injectable } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
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
    @InjectConnection() connection: Connection,
    @InjectRepository(CityEntity)
    repository: Repository<CityEntity>,
  ) {
    super(connection, repository, CityEntity);
  }
}
