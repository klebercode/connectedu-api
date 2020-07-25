import { Injectable } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { ServicePublic } from '../common/services/public.service';

import { OrganizationEntity } from './entities/organization.object';
import { CreateOrganizationInput } from './types/create-organization.input';
import { UpdateOrganizationInput } from './types/update-organization.input';

@Injectable()
export class OrganizationsService extends ServicePublic<
  OrganizationEntity,
  CreateOrganizationInput,
  UpdateOrganizationInput
> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectRepository(OrganizationEntity)
    repository: Repository<OrganizationEntity>,
  ) {
    super(connection, repository, OrganizationEntity);
  }
}
