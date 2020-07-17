import { Inject, GoneException } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { CreateCompanyInput } from './types/create-company.input';
import { CompanyEntity } from './entities/company.entity';

@CustomersServiceDecorator()
export class CompaniesService {
  private companiesRepository: Repository<CompanyEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.companiesRepository = this.connection.getRepository(CompanyEntity);
  }

  async create(
    company: CreateCompanyInput,
    idUser: any,
  ): Promise<CompanyEntity> {
    const obj = await this.companiesRepository.save({
      ...company,
      userCreatedId: idUser,
      userUpdatedId: idUser,
    });
    return obj;
  }

  async findOneById(id: number): Promise<CompanyEntity> {
    const obj = await this.companiesRepository.findOne(id);
    if (!obj) {
      return null;
    }
    return obj;
  }

  async findAll(): Promise<CompanyEntity[]> {
    return await this.companiesRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.companiesRepository.delete(id);
  }

  async update(
    id: number,
    company: Partial<CreateCompanyInput>,
    idUser: any,
  ): Promise<CompanyEntity> {
    await this.companiesRepository.update(id, {
      ...company,
      userUpdatedId: idUser,
    });
    return this.findOneById(id);
  }
}
