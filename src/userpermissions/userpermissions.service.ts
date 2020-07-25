import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { UserPermissionEntity } from './entities/userpermission.entity';
import { CreateUserPermissionInput } from './types/create-userpermission.input';
import { UpdateUserPermissionInput } from './types/update-userpermission.input';

@CustomersServiceDecorator()
export class UserPermissionsService extends ServiceDefault<
  UserPermissionEntity,
  CreateUserPermissionInput,
  UpdateUserPermissionInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, UserPermissionEntity);
  }
}
