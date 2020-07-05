import { Inject, GoneException } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { CreateTeacherInput } from './types/create-teacher.input';
import { TeacherEntity } from './entities/teacher.entity';

@CustomersServiceDecorator()
export class TeachersService {
  private teachersRepository: Repository<TeacherEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.teachersRepository = this.connection.getRepository(TeacherEntity);
  }

  async create(
    company: CreateTeacherInput,
    idUser: any,
  ): Promise<TeacherEntity> {
    try {
      const obj = await this.teachersRepository.save({
        ...company,
        userCreatedId: idUser,
        userUpdatedId: idUser,
      });
      return obj;
    } catch (error) {
      throw new GoneException(error);
    }
  }

  async findOneById(id: number): Promise<TeacherEntity> {
    const obj = await this.teachersRepository.findOne(id);
    if (!obj) {
      return null;
    }
    return obj;
  }

  async findAll(): Promise<TeacherEntity[]> {
    return await this.teachersRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.teachersRepository.delete(id);
  }

  async update(
    id: number,
    company: Partial<CreateTeacherInput>,
    idUser: any,
  ): Promise<TeacherEntity> {
    try {
      await this.teachersRepository.update(id, {
        ...company,
        userUpdatedId: idUser,
      });
      return this.findOneById(id);
    } catch (error) {
      throw new GoneException(error);
    }
  }
}
