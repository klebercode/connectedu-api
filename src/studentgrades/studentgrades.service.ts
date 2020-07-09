import { Inject, GoneException } from '@nestjs/common';
import { CreatStudentGradeInput } from './types/create-studentgrade.input';
import { StudentGradeEntity } from './entities/studentgrade.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersServiceDecorator()
export class StudentGradesService {
  private studentGradeRepository: Repository<StudentGradeEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.studentGradeRepository = this.connection.getRepository(
      StudentGradeEntity,
    );
  }

  async findAll(): Promise<StudentGradeEntity[]> {
    return await this.studentGradeRepository.find();
  }

  async findOneById(id: number): Promise<StudentGradeEntity> {
    if (!id) {
      return null;
    }
    const user = await this.studentGradeRepository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(
    studentGrade: CreatStudentGradeInput,
    idUser: any,
  ): Promise<StudentGradeEntity> {
    try {
      const obj = await this.studentGradeRepository.save({
        ...studentGrade,
        userCreatedId: idUser,
        userUpdatedId: idUser,
      });
      return obj;
    } catch (error) {
      throw new GoneException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    await this.studentGradeRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async update(
    id: number,
    studentGrade: Partial<CreatStudentGradeInput>,
    idUser: any,
  ): Promise<StudentGradeEntity> {
    try {
      await this.studentGradeRepository.update(id, {
        ...studentGrade,
        userUpdatedId: idUser,
      });
      return this.findOneById(id);
    } catch (error) {
      throw new GoneException(error);
    }
  }
}
