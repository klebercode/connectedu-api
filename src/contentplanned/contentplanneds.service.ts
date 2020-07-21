import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/global.service';

import { ContentPlannedEntity } from './entities/contentplanned.entity';
import { CreatContentPlannedInput } from './types/create-contentplanned.input';
import { UpdateContentPlannedInput } from './types/update-contentplanned.input';

@CustomersServiceDecorator()
export class ContentPlannedsService extends ServiceDefault<
  ContentPlannedEntity,
  CreatContentPlannedInput,
  UpdateContentPlannedInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, ContentPlannedEntity);
  }
}
