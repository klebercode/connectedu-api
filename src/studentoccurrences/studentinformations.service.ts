import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/global.service';

import { StudentOccurrenceEntity } from './entities/studentoccurrence.entity';
import { CreatStudentOccurrenceInput } from './types/create-studentoccurrences.input';
import { UpdateStudentOccurrenceInput } from './types/update-studentoccurrences.input';

@CustomersServiceDecorator()
export class StudentOccurrencesService extends ServiceDefault<
  StudentOccurrenceEntity,
  CreatStudentOccurrenceInput,
  UpdateStudentOccurrenceInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, StudentOccurrenceEntity);
  }
}
