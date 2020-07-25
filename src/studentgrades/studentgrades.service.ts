import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { StudentGradeEntity } from './entities/studentgrade.entity';
import { CreatStudentGradeInput } from './types/create-studentgrade.input';
import { UpdateStudentGradeInput } from './types/update-studentgrade.input';

@CustomersServiceDecorator()
export class StudentGradesService extends ServiceDefault<
  StudentGradeEntity,
  CreatStudentGradeInput,
  UpdateStudentGradeInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, StudentGradeEntity);
  }
}
