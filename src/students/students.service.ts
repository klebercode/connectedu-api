import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/global.service';

import { StudentEntity } from './entities/student.entity';
import { CreateStudentInput } from './types/create-student.input';
import { UpdateStudentInput } from './types/update-student.input';

@CustomersServiceDecorator()
export class StudentsService extends ServiceDefault<
  StudentEntity,
  CreateStudentInput,
  UpdateStudentInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, StudentEntity);
  }
}
