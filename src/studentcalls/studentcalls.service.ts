import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { StudentCallEntity } from './entities/studentcall.entity';
import { CreatStudentCallInput } from './types/create-studentcall.input';
import { UpdateStudentCallInput } from './types/update-studentcall.input';

@CustomersServiceDecorator()
export class StudentCallsService extends ServiceDefault<
  StudentCallEntity,
  CreatStudentCallInput,
  UpdateStudentCallInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, StudentCallEntity);
  }
}
