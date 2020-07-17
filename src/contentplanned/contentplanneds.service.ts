import { Inject, GoneException } from '@nestjs/common';
import { CreatContentPlannedInput } from './types/create-contentplanned.input';
import { ContentPlannedEntity } from './entities/contentplanned.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersServiceDecorator()
export class ContentPlannedsService {
  private contentPlannedRepository: Repository<ContentPlannedEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.contentPlannedRepository = this.connection.getRepository(
      ContentPlannedEntity,
    );
  }

  async findAll(): Promise<ContentPlannedEntity[]> {
    return await this.contentPlannedRepository.find();
  }

  async findOneById(id: number): Promise<ContentPlannedEntity> {
    if (!id) {
      return null;
    }
    const user = await this.contentPlannedRepository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(
    contentPlanned: CreatContentPlannedInput,
    idUser: any,
  ): Promise<ContentPlannedEntity> {
    const obj = await this.contentPlannedRepository.save({
      ...contentPlanned,
      userCreatedId: idUser,
      userUpdatedId: idUser,
    });
    return obj;
  }

  async remove(id: number): Promise<boolean> {
    await this.contentPlannedRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async update(
    id: number,
    contentPlanned: Partial<CreatContentPlannedInput>,
    idUser: any,
  ): Promise<ContentPlannedEntity> {
    await this.contentPlannedRepository.update(id, {
      ...contentPlanned,
      userUpdatedId: idUser,
    });
    return this.findOneById(id);
  }
}
