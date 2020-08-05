import { Injectable, Inject } from '@nestjs/common';
import { ServicePublic } from '../common/services/public.service';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { PermissionEntity } from './entities/permission.object';
import { CreatePermissionInput } from './types/create-permission.input';
import { UpdatePermissionInput } from './types/update-permission.input';

@Injectable()
export class PermissionsService extends ServicePublic<
  PermissionEntity,
  CreatePermissionInput,
  UpdatePermissionInput
> {
  constructor(
    @InjectConnection() connectionPublic: Connection,
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
  ) {
    super(connectionPublic, PermissionEntity);
  }
}
