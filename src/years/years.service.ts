import { Inject, GoneException } from '@nestjs/common';
import { CreateYearInput } from './types/create-year.input';
import { YearEntity } from './entities/year.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersServiceDecorator()
export class YearsService {
  private yearRepository: Repository<YearEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.yearRepository = this.connection.getRepository(YearEntity);
  }

  async findAll(): Promise<YearEntity[]> {
    return await this.yearRepository.find();
  }

  async findOneById(id: number): Promise<YearEntity> {
    if (!id) {
      return null;
    }
    const user = await this.yearRepository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(
    userPermission: CreateYearInput,
    idUser: any,
  ): Promise<YearEntity> {
    try {
      const obj = await this.yearRepository.save({
        ...userPermission,
        userCreatedId: idUser,
        userUpdatedId: idUser,
      });
      return obj;
    } catch (error) {
      throw new GoneException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    await this.yearRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async update(
    id: number,
    userPermission: Partial<CreateYearInput>,
    idUser: any,
  ): Promise<YearEntity> {
    try {
      await this.yearRepository.update(id, {
        ...userPermission,
        userUpdatedId: idUser,
      });
      return this.findOneById(id);
    } catch (error) {
      throw new GoneException(error);
    }
  }
}
