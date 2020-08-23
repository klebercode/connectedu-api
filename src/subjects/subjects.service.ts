import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { SubjectEntity } from './entities/subject.entity';
import { CreateSubjectInput } from './types/create-subject.input';
import { UpdateSubjectInput } from './types/update-subject.input';
import { UserLogsService } from '../userlogs/userlogs.service';

@CustomersServiceDecorator()
export class SubjectsService extends ServiceDefault<
  SubjectEntity,
  CreateSubjectInput,
  UpdateSubjectInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, SubjectEntity);
  }
}
