import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { ServicePublic } from '../common/services/public.service';

import { StateEntity } from './entities/state.object';
import { CreateStateInput } from './types/create-state.input';
import { UpdateStateInput } from './types/update-state.input';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@Injectable()
export class StatesService extends ServicePublic<
  StateEntity,
  CreateStateInput,
  UpdateStateInput
> {
  constructor(
    @InjectConnection() connectionPublic: Connection,
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
  ) {
    super(connectionPublic, StateEntity);
  }
}
