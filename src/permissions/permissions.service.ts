import { Injectable } from '@nestjs/common';
import { ServicePublic } from '../common/services/public.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    @InjectRepository(PermissionEntity)
    private repository: Repository<PermissionEntity>,
  ) {
    super(repository);
  }
}
