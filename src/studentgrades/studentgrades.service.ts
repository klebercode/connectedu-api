import { Inject, ConflictException } from '@nestjs/common';
import { Connection, Not } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { StudentGradeEntity } from './entities/studentgrade.entity';
import { CreatStudentGradeInput } from './types/create-studentgrade.input';
import { UpdateStudentGradeInput } from './types/update-studentgrade.input';
import { UserLogsService } from '../userlogs/userlogs.service';

@CustomersServiceDecorator()
export class StudentGradesService extends ServiceDefault<
  StudentGradeEntity,
  CreatStudentGradeInput,
  UpdateStudentGradeInput
> {
  constructor(
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
    private readonly userLogsService: UserLogsService,
  ) {
    super(connection, StudentGradeEntity, userLogsService);
  }

  //(['studentId', 'yearId', 'subjectId', 'unit', 'typeUnit'])

  async update(
    id: number,
    input: UpdateStudentGradeInput,
    idUser: number,
    typeUser: string,
  ): Promise<StudentGradeEntity> {
    const wobjId = await super.findOneId({
      where: {
        id: Not(id),
        studentId: input.studentId,
        yearId: input.yearId,
        subjectId: input.subjectId,
        unit: input.unit,
        typeUnit: input.typeUnit,
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
    input: [UpdateStudentGradeInput],
    idUser: number,
    typeUser: string,
  ): Promise<boolean> {
    let objects: [UpdateStudentGradeInput];

    const promisesLog = input.map(async item => {
      const wobjId = await super.findOneId({
        where: [
          {
            id: Not(item.id),
            studentId: item.studentId,
            yearId: item.yearId,
            subjectId: item.subjectId,
            unit: item.unit,
            typeUnit: item.typeUnit,
          },
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
    input: CreatStudentGradeInput,
    idUser: number,
    typeUser: string,
  ): Promise<StudentGradeEntity> {
    const wobjId = await super.findOneId({
      where: [
        {
          studentId: input.studentId,
          yearId: input.yearId,
          subjectId: input.subjectId,
          unit: input.unit,
          typeUnit: input.typeUnit,
        },
      ],
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
    input: [CreatStudentGradeInput],
    idUser: number,
    typeUser: string,
  ): Promise<StudentGradeEntity[]> {
    let objects: [CreatStudentGradeInput];

    const promisesLog = input.map(async item => {
      const wobjId = await super.findOneId({
        where: [
          {
            studentId: item.studentId,
            yearId: item.yearId,
            subjectId: item.subjectId,
            unit: item.unit,
            typeUnit: item.typeUnit,
          },
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

    return super.createMany(objects, idUser, typeUser);
  }
}
