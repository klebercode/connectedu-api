import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { EmployeeEntity } from './entities/employee.entity';
import { CreateEmploeeInput } from './types/create-employee.input';
import { UpdateEmploeeInput } from './types/update-employee.input';
import { UserLogsService } from '../userlogs/userlogs.service';

@CustomersServiceDecorator()
export class EmployeesService extends ServiceDefault<
  EmployeeEntity,
  CreateEmploeeInput,
  UpdateEmploeeInput
> {
  constructor(
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
    private readonly userLogsService: UserLogsService,
  ) {
    super(connection, EmployeeEntity, userLogsService);
  }
}
