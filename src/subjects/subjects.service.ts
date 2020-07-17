import {
  Inject,
  HttpException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubjectInput } from './types/create-subject.input';
import { UpdateSubjectInput } from './types/update-subject.input';

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
    const obj = await this.subjectRepository.save({
      ...subject,
      userCreatedId: idUser,
      userUpdatedId: idUser,
    });
    return obj;
  }

  async createMany(
    subjects: [CreateSubjectInput],
    idUser: any,
  ): Promise<SubjectEntity[]> {
    const objcts = [];

    subjects.forEach(async item => {
      objcts.push({
        ...item,
        userCreatedId: idUser,
        userUpdatedId: idUser,
      });
    });

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const obj = await queryRunner.manager.save(SubjectEntity, objcts);
      await queryRunner.commitTransaction();

      return obj;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(error, error);
    } finally {
      await queryRunner.release();
    }
  }

  async updateMany(
    subjects: [UpdateSubjectInput],
    idUser: any,
  ): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      subjects.forEach(async item => {
        const wret = await queryRunner.manager.update(
          SubjectEntity,
          item['id'],
          {
            ...item,
            userUpdatedId: idUser,
          },
        );
      });

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(error, error);
    } finally {
      await queryRunner.release();
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
    await this.subjectRepository.update(id, {
      ...subject,
      userUpdatedId: idUser,
    });
    return this.findOneById(id);
  }
}
