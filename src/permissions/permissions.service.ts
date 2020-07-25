import { Injectable } from '@nestjs/common';
import { ServicePublic } from '../common/services/public.service';
import { Repository, Connection } from 'typeorm';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';

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
    @InjectConnection() connection: Connection,
    @InjectRepository(PermissionEntity)
    repository: Repository<PermissionEntity>,
  ) {
    super(connection, repository, PermissionEntity);
  }
}
