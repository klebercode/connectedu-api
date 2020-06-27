import { Injectable } from '@nestjs/common';
import { CreateOrganizationInput } from './types/create-organization.input';
import { OrganizationEntity } from './entities/organization.object';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private organizationsRepository: Repository<OrganizationEntity>,
  ) {}

  async create(
    organization: CreateOrganizationInput,
  ): Promise<OrganizationEntity> {
    const obj = await this.organizationsRepository.save(organization);
    return obj;
  }

  async findOneById(id: number): Promise<OrganizationEntity> {
    const obj = await this.organizationsRepository.findOne(id);
    if (!obj) {
      return null;
    }
    return obj;
  }

  async findAll(): Promise<OrganizationEntity[]> {
    return await this.organizationsRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.organizationsRepository.delete(id);
  }

  async update(
    id: number,
    organization: Partial<OrganizationEntity>,
  ): Promise<OrganizationEntity> {
    await this.organizationsRepository.update(id, organization);
    return this.findOneById(id);
  }
}
