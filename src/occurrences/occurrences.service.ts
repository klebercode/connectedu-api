import { Inject, GoneException } from '@nestjs/common';
import { CreateOccurrenceInput } from './types/create-occurrence.input';
import { OccurrenceEntity } from './entities/occurrence.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersServiceDecorator()
export class OccurrencesService {
  private occurrenceRepository: Repository<OccurrenceEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.occurrenceRepository = this.connection.getRepository(OccurrenceEntity);
  }

  async findAll(): Promise<OccurrenceEntity[]> {
    return await this.occurrenceRepository.find();
  }

  async findOneById(id: number): Promise<OccurrenceEntity> {
    if (!id) {
      return null;
    }
    const user = await this.occurrenceRepository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(
    Occurrence: CreateOccurrenceInput,
    idUser: any,
  ): Promise<OccurrenceEntity> {
    const obj = await this.occurrenceRepository.save({
      ...Occurrence,
      userCreatedId: idUser,
      userUpdatedId: idUser,
    });
    return obj;
  }

  async remove(id: number): Promise<boolean> {
    await this.occurrenceRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async update(
    id: number,
    Occurrence: Partial<CreateOccurrenceInput>,
    idUser: any,
  ): Promise<OccurrenceEntity> {
    await this.occurrenceRepository.update(id, {
      ...Occurrence,
      userUpdatedId: idUser,
    });
    return this.findOneById(id);
  }
}
