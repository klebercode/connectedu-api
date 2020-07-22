import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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
    @InjectRepository(OrganizationEntity)
    private repository: Repository<OrganizationEntity>,
  ) {
    super(repository);
  }
}
