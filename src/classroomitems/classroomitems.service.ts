import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/global.service';

import { CreateClassRoomItemInput } from './types/create-classroomitem.input';
import { UpdateClassRoomItemInput } from './types/update-classroomitem.input';
import { ClassRoomItemEntity } from './entities/classroomitem.entity';

@CustomersServiceDecorator()
export class ClassRoomItemsService extends ServiceDefault<
  ClassRoomItemEntity,
  CreateClassRoomItemInput,
  UpdateClassRoomItemInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, ClassRoomItemEntity);
  }
}
