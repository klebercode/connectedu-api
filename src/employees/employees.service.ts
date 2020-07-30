import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { EmployeeEntity } from './entities/employee.entity';
import { CreateEmploeeInput } from './types/create-employee.input';
import { UpdateEmploeeInput } from './types/update-employee.input';

@CustomersServiceDecorator()
export class EmployeesService extends ServiceDefault<
  EmployeeEntity,
  CreateEmploeeInput,
  UpdateEmploeeInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, EmployeeEntity);
  }

  async updateToken(
    id: number,
    token: string,
    idUser: number,
  ): Promise<Boolean> {
    await this.repository.update(id, {
      token: token,
      userUpdatedId: idUser,
    });
    return true;
  }
}
