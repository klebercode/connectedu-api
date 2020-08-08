import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { ServicePublic } from '../common/services/public.service';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

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
    @InjectConnection() connectionPublic: Connection,
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
  ) {
    super(connectionPublic, CityEntity);
  }
}
