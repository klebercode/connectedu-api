import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/global.service';

import { ClassRoomEntity } from './entities/classroom.entity';
import { CreateClassRoomInput } from './types/create-classroom.input';
import { UpdateClassRoomInput } from './types/update-classroom.input';

@CustomersServiceDecorator()
export class ClassRoomsService extends ServiceDefault<
  ClassRoomEntity,
  CreateClassRoomInput,
  UpdateClassRoomInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, ClassRoomEntity);
  }
}
