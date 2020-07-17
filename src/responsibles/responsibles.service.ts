import { Inject, GoneException } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { CreateResponsibleInput } from './types/create-responsible.input';
import { ResponsibleEntity } from './entities/responsible.entity';

@CustomersServiceDecorator()
export class ResponsiblesService {
  private responsiblesRepository: Repository<ResponsibleEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.responsiblesRepository = this.connection.getRepository(
      ResponsibleEntity,
    );
  }

  async create(
    responsible: CreateResponsibleInput,
    idUser: any,
  ): Promise<ResponsibleEntity> {
    const obj = await this.responsiblesRepository.save({
      ...responsible,
      userCreatedId: idUser,
      userUpdatedId: idUser,
    });
    return obj;
  }

  async findOneById(id: number): Promise<ResponsibleEntity> {
    const obj = await this.responsiblesRepository.findOne(id);
    if (!obj) {
      return null;
    }
    return obj;
  }

  async findAll(): Promise<ResponsibleEntity[]> {
    return await this.responsiblesRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.responsiblesRepository.delete(id);
  }

  async update(
    id: number,
    responsible: Partial<CreateResponsibleInput>,
    idUser: any,
  ): Promise<ResponsibleEntity> {
    await this.responsiblesRepository.update(id, {
      ...responsible,
      userUpdatedId: idUser,
    });
    return this.findOneById(id);
  }
}
