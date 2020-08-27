import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { ContentAppliedEntity } from './entities/contentapplied.entity';
import { CreatContentAppliedInput } from './types/create-contentapplied.input';
import { UpdateContentAppliedInput } from './types/update-contentapplied.input';
import { UserLogsService } from '../userlogs/userlogs.service';

@CustomersServiceDecorator()
export class ContentAppliedsService extends ServiceDefault<
  ContentAppliedEntity,
  CreatContentAppliedInput,
  UpdateContentAppliedInput
> {
  constructor(
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
    private readonly userLogsService: UserLogsService,
  ) {
    super(connection, ContentAppliedEntity, userLogsService);
  }
}
