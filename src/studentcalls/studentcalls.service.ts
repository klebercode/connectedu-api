import { Inject, GoneException } from '@nestjs/common';
import { CreatStudentCallInput } from './types/create-studentcall.input';
import { StudentCallEntity } from './entities/studentcall.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersServiceDecorator()
export class StudentCallsService {
  private studentCallRepository: Repository<StudentCallEntity>;

  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.studentCallRepository = this.connection.getRepository(
      StudentCallEntity,
    );
  }

  async findAll(): Promise<StudentCallEntity[]> {
    return await this.studentCallRepository.find();
  }

  async findOneById(id: number): Promise<StudentCallEntity> {
    if (!id) {
      return null;
    }
    const user = await this.studentCallRepository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(
    studentCall: CreatStudentCallInput,
    idUser: any,
  ): Promise<StudentCallEntity> {
    const obj = await this.studentCallRepository.save({
      ...studentCall,
      userCreatedId: idUser,
      userUpdatedId: idUser,
    });
    return obj;
  }

  async remove(id: number): Promise<boolean> {
    await this.studentCallRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async update(
    id: number,
    studentCall: Partial<CreatStudentCallInput>,
    idUser: any,
  ): Promise<StudentCallEntity> {
    await this.studentCallRepository.update(id, {
      ...studentCall,
      userUpdatedId: idUser,
    });
    return this.findOneById(id);
  }
}
