import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import * as bcryptjs from 'bcryptjs';

import { UserEntity } from './entities/user.entity';
import { CreateUsersInput } from './types/create-user.input';
import { UpdateUsersInput } from './types/update-user.input';

@CustomersServiceDecorator()
export class UsersService extends ServiceDefault<
  UserEntity,
  CreateUsersInput,
  UpdateUsersInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, UserEntity);
  }
}
