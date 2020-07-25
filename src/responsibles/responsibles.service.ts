import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { ResponsibleEntity } from './entities/responsible.entity';
import { CreateResponsibleInput } from './types/create-responsible.input';
import { UpdateResponsibleInput } from './types/update-responsible.input';

@CustomersServiceDecorator()
export class ResponsiblesService extends ServiceDefault<
  ResponsibleEntity,
  CreateResponsibleInput,
  UpdateResponsibleInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, ResponsibleEntity);
  }
}
