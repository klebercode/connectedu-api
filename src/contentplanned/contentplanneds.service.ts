import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { ContentPlannedEntity } from './entities/contentplanned.entity';
import { CreatContentPlannedInput } from './types/create-contentplanned.input';
import { UpdateContentPlannedInput } from './types/update-contentplanned.input';
import { UserLogsService } from '../userlogs/userlogs.service';

@CustomersServiceDecorator()
export class ContentPlannedsService extends ServiceDefault<
  ContentPlannedEntity,
  CreatContentPlannedInput,
  UpdateContentPlannedInput
> {
  constructor(
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
    private readonly userLogsService: UserLogsService,
  ) {
    super(connection, ContentPlannedEntity, userLogsService);
  }
}
