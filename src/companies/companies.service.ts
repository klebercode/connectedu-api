import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { CompanyEntity } from './entities/company.entity';
import { CreateCompanyInput } from './types/create-company.input';
import { UpdateCompanyInput } from './types/update-company.input';

@CustomersServiceDecorator()
export class CompaniesService extends ServiceDefault<
  CompanyEntity,
  CreateCompanyInput,
  UpdateCompanyInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, CompanyEntity);
  }
}
