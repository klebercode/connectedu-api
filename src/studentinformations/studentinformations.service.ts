import { Inject, GoneException } from '@nestjs/common';
import { CreatStudentInformationInput } from './types/create-studentinformation.input';
import { StudentInformationEntity } from './entities/studentinformation.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersServiceDecorator()
export class StudentInformationsService {
  private studentInformationRepository: Repository<StudentInformationEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.studentInformationRepository = this.connection.getRepository(
      StudentInformationEntity,
    );
  }

  async findAll(): Promise<StudentInformationEntity[]> {
    return await this.studentInformationRepository.find();
  }

  async findOneById(id: number): Promise<StudentInformationEntity> {
    if (!id) {
      return null;
    }
    const user = await this.studentInformationRepository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(
    studentInformation: CreatStudentInformationInput,
    idUser: any,
  ): Promise<StudentInformationEntity> {
    try {
      const obj = await this.studentInformationRepository.save({
        ...studentInformation,
        userCreatedId: idUser,
        userUpdatedId: idUser,
      });
      return obj;
    } catch (error) {
      throw new GoneException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    await this.studentInformationRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async update(
    id: number,
    studentInformation: Partial<CreatStudentInformationInput>,
    idUser: any,
  ): Promise<StudentInformationEntity> {
    try {
      await this.studentInformationRepository.update(id, {
        ...studentInformation,
        userUpdatedId: idUser,
      });
      return this.findOneById(id);
    } catch (error) {
      throw new GoneException(error);
    }
  }
}
