import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/global.service';

import { OccurrenceEntity } from './entities/occurrence.entity';
import { CreateOccurrenceInput } from './types/create-occurrence.input';
import { UpdateOccurrenceInput } from './types/update-occurrence.input';

@CustomersServiceDecorator()
export class OccurrencesService extends ServiceDefault<
  OccurrenceEntity,
  CreateOccurrenceInput,
  UpdateOccurrenceInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, OccurrenceEntity);
  }
}
