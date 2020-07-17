import { Inject, GoneException } from '@nestjs/common';
import { CreatContentAppliedInput } from './types/create-contentapplied.input';
import { ContentAppliedEntity } from './entities/contentapplied.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersServiceDecorator()
export class ContentAppliedsService {
  private contentAppliedRepository: Repository<ContentAppliedEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.contentAppliedRepository = this.connection.getRepository(
      ContentAppliedEntity,
    );
  }

  async findAll(): Promise<ContentAppliedEntity[]> {
    return await this.contentAppliedRepository.find();
  }

  async findOneById(id: number): Promise<ContentAppliedEntity> {
    if (!id) {
      return null;
    }
    const user = await this.contentAppliedRepository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(
    contentApplied: CreatContentAppliedInput,
    idUser: any,
  ): Promise<ContentAppliedEntity> {
    const obj = await this.contentAppliedRepository.save({
      ...contentApplied,
      userCreatedId: idUser,
      userUpdatedId: idUser,
    });
    return obj;
  }

  async remove(id: number): Promise<boolean> {
    await this.contentAppliedRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async update(
    id: number,
    contentApplied: Partial<CreatContentAppliedInput>,
    idUser: any,
  ): Promise<ContentAppliedEntity> {
    await this.contentAppliedRepository.update(id, {
      ...contentApplied,
      userUpdatedId: idUser,
    });
    return this.findOneById(id);
  }
}
