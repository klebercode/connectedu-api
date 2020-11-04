import { Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { Connection, Not } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { StudentInformationEntity } from './entities/studentinformation.entity';
import { CreatStudentInformationInput } from './types/create-studentinformation.input';
import { UpdateStudentInformationInput } from './types/update-studentinformation.input';
import { UserLogsService } from '../userlogs/userlogs.service';

@CustomersServiceDecorator()
export class StudentInformationsService extends ServiceDefault<
  StudentInformationEntity,
  CreatStudentInformationInput,
  UpdateStudentInformationInput
> {
  constructor(
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
    private readonly userLogsService: UserLogsService,
  ) {
    super(connection, StudentInformationEntity, userLogsService);
  }

  async update(
    id: number,
    input: UpdateStudentInformationInput,
    idUser: number,
    typeUser: string,
  ): Promise<StudentInformationEntity> {
    const wobjId = await super.findOneId({
      where: {
        id: Not(id),
        studentId: input.studentId,
        yearId: input.yearId,
      },
    });

    if (wobjId) {
      throw new ConflictException({
        message: 'Registro já Existente !',
        code: 409,
      });
    }

    const obj = super.update(id, input, idUser, typeUser);

    return obj;
  }

  async updateMany(
    input: [UpdateStudentInformationInput],
    idUser: number,
    typeUser: string,
  ): Promise<boolean> {
    let objects: [UpdateStudentInformationInput];

    const promisesLog = input.map(async item => {
      const wobjId = await super.findOneId({
        where: [
          { id: Not(item.id), studentId: item.studentId, yearId: item.yearId },
        ],
      });

      if (!wobjId) {
        if (!objects) {
          objects = [item];
        } else {
          objects.push(item);
        }
      }
    });

    await Promise.all(promisesLog);

    if (!objects) {
      throw new ConflictException({
        message: 'Registros já Existentes !',
        code: 409,
      });
    }

    return super.updateMany(objects, idUser, typeUser);
  }

  async create(
    input: CreatStudentInformationInput,
    idUser: number,
    typeUser: string,
  ): Promise<StudentInformationEntity> {
    const wobjId = await super.findOneId({
      where: [{ studentId: input.studentId, yearId: input.yearId }],
    });

    if (wobjId) {
      throw new ConflictException({
        message: 'Registro já Existente !',
        code: 409,
      });
    }

    const obj = super.create(input, idUser, typeUser);

    return obj;
  }

  async createMany(
    input: [CreatStudentInformationInput],
    idUser: number,
    typeUser: string,
  ): Promise<StudentInformationEntity[]> {
    let objects: [CreatStudentInformationInput];

    const promisesLog = input.map(async item => {
      const wobjId = await super.findOneId({
        where: [{ studentId: item.studentId, yearId: item.yearId }],
      });

      if (!wobjId) {
        if (!objects) {
          objects = [item];
        } else {
          objects.push(item);
        }
      }
    });

    await Promise.all(promisesLog);

    if (!objects) {
      throw new ConflictException({
        message: 'Registros já Existentes !',
        code: 409,
      });
    }

    return super.createMany(objects, idUser, typeUser);
  }
}
