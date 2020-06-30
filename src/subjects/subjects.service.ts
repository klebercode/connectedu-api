import { Inject, GoneException } from '@nestjs/common';
import { CreateSubjectInput } from './types/create-subject.input';
import { SubjectEntity } from './entities/subject.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersServiceDecorator()
export class SubjectsService {
  private subjectRepository: Repository<SubjectEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.subjectRepository = this.connection.getRepository(SubjectEntity);
  }

  async findAll(): Promise<SubjectEntity[]> {
    return await this.subjectRepository.find();
  }

  async findOneById(id: number): Promise<SubjectEntity> {
    if (!id) {
      return null;
    }
    const user = await this.subjectRepository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(
    subject: CreateSubjectInput,
    idUser: any,
  ): Promise<SubjectEntity> {
    try {
      const obj = await this.subjectRepository.save({
        ...subject,
        userCreatedId: idUser,
      });
      return obj;
    } catch (error) {
      throw new GoneException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    await this.subjectRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async update(
    id: number,
    subject: Partial<CreateSubjectInput>,
    idUser: any,
  ): Promise<SubjectEntity> {
    try {
      await this.subjectRepository.update(id, {
        ...subject,
        userUpdatedId: idUser,
      });
      return this.findOneById(id);
    } catch (error) {
      throw new GoneException(error);
    }
  }
}
