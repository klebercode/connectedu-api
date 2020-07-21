import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/global.service';

import { YearEntity } from './entities/year.entity';
import { CreateYearInput } from './types/create-year.input';
import { UpdateYearInput } from './types/update-year.input';

@CustomersServiceDecorator()
export class YearsService extends ServiceDefault<
  YearEntity,
  CreateYearInput,
  UpdateYearInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, YearEntity);
  }
}
