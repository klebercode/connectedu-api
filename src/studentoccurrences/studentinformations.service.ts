import { Inject, GoneException } from '@nestjs/common';
import { CreatStudentOccurrenceInput } from './types/create-studentoccurrences.input';
import { StudentOccurrenceEntity } from './entities/studentoccurrence.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersServiceDecorator()
export class StudentOccurrencesService {
  private studentOccurrenceRepository: Repository<StudentOccurrenceEntity>;

  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.studentOccurrenceRepository = this.connection.getRepository(
      StudentOccurrenceEntity,
    );
  }

  async findAll(): Promise<StudentOccurrenceEntity[]> {
    return await this.studentOccurrenceRepository.find();
  }

  async findOneById(id: number): Promise<StudentOccurrenceEntity> {
    if (!id) {
      return null;
    }
    const user = await this.studentOccurrenceRepository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(
    studentOccurrence: CreatStudentOccurrenceInput,
    idUser: any,
  ): Promise<StudentOccurrenceEntity> {
    const obj = await this.studentOccurrenceRepository.save({
      ...studentOccurrence,
      userCreatedId: idUser,
      userUpdatedId: idUser,
    });
    return obj;
  }

  async remove(id: number): Promise<boolean> {
    await this.studentOccurrenceRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async update(
    id: number,
    studentOccurrence: Partial<CreatStudentOccurrenceInput>,
    idUser: any,
  ): Promise<StudentOccurrenceEntity> {
    await this.studentOccurrenceRepository.update(id, {
      ...studentOccurrence,
      userUpdatedId: idUser,
    });
    return this.findOneById(id);
  }
}
