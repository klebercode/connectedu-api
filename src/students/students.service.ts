import { Inject, GoneException } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { CreateStudentInput } from './types/create-student.input';
import { StudentEntity } from './entities/student.entity';

@CustomersServiceDecorator()
export class StudentsService {
  private studentsRepository: Repository<StudentEntity>;

  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.studentsRepository = this.connection.getRepository(StudentEntity);
  }

  async create(
    student: CreateStudentInput,
    idUser: any,
  ): Promise<StudentEntity> {
    const obj = await this.studentsRepository.save({
      ...student,
      userCreatedId: idUser,
      userUpdatedId: idUser,
    });
    return obj;
  }

  async findOneById(id: number): Promise<StudentEntity> {
    const obj = await this.studentsRepository.findOne(id);
    if (!obj) {
      return null;
    }
    return obj;
  }

  async findAll(): Promise<StudentEntity[]> {
    return await this.studentsRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.studentsRepository.delete(id);
  }

  async update(
    id: number,
    student: Partial<CreateStudentInput>,
    idUser: any,
  ): Promise<StudentEntity> {
    await this.studentsRepository.update(id, {
      ...student,
      userUpdatedId: idUser,
    });
    return this.findOneById(id);
  }
}
