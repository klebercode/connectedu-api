import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { ServicePublic } from '../common/services/public.service';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { OrganizationEntity } from './entities/organization.object';
import { CreateOrganizationInput } from './types/create-organization.input';
import { UpdateOrganizationInput } from './types/update-organization.input';
import { UserLogsService } from '../userlogs/userlogs.service';

@Injectable()
export class OrganizationsService extends ServicePublic<
  OrganizationEntity,
  CreateOrganizationInput,
  UpdateOrganizationInput
> {
  constructor(
    @InjectConnection() connectionPublic: Connection,
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
    private readonly userLogsService: UserLogsService,
  ) {
    super(connectionPublic, OrganizationEntity, userLogsService);
  }
}
