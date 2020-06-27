import { Inject, NotFoundException } from '@nestjs/common';
import { CreateStudentInput } from './types/create-student.input';
import { StudentArgs } from './types/student.args';
import { StudentEntity } from './entities/student.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

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
    const studentCreated = await this.studentsRepository.save({
      ...student,
      userCreatedId: idUser,
    });
    return studentCreated;
  }

  async findOneById(id: number): Promise<StudentEntity> {
    const student = await this.studentsRepository.findOne(id);
    if (!student) {
      return null;
    }
    return student;
  }

  async findAll(studentArgs: StudentArgs): Promise<StudentEntity[]> {
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
