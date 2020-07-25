import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { StudentInformationEntity } from './entities/studentinformation.entity';
import { CreatStudentInformationInput } from './types/create-studentinformation.input';
import { UpdateStudentInformationInput } from './types/update-studentinformation.input';

@CustomersServiceDecorator()
export class StudentInformationsService extends ServiceDefault<
  StudentInformationEntity,
  CreatStudentInformationInput,
  UpdateStudentInformationInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, StudentInformationEntity);
  }
}
