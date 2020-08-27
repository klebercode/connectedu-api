import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { CreateClassRoomInjectInput } from './types/create-classroominject.input';
import { UpdateClassRoomInjectInput } from './types/update-classroominject.input';
import { ClassRoomInjectEntity } from './entities/classroominject.entity';
import { UserLogsService } from '../userlogs/userlogs.service';

@CustomersServiceDecorator()
export class ClassRoomInjectsService extends ServiceDefault<
  ClassRoomInjectEntity,
  CreateClassRoomInjectInput,
  UpdateClassRoomInjectInput
> {
  constructor(
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
    private readonly userLogsService: UserLogsService,
  ) {
    super(connection, ClassRoomInjectEntity, userLogsService);
  }
}
