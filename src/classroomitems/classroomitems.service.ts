import { Inject, ConflictException } from '@nestjs/common';
import { Connection, Not } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { CreateClassRoomItemInput } from './types/create-classroomitem.input';
import { UpdateClassRoomItemInput } from './types/update-classroomitem.input';
import { ClassRoomItemEntity } from './entities/classroomitem.entity';
import { UserLogsService } from '../userlogs/userlogs.service';

@CustomersServiceDecorator()
export class ClassRoomItemsService extends ServiceDefault<
  ClassRoomItemEntity,
  CreateClassRoomItemInput,
  UpdateClassRoomItemInput
> {
  constructor(
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
    private readonly userLogsService: UserLogsService,
  ) {
    super(connection, ClassRoomItemEntity, userLogsService);
  }

  async update(
    id: number,
    input: UpdateClassRoomItemInput,
    idUser: number,
    typeUser: string,
  ): Promise<ClassRoomItemEntity> {
    const wobjId = await super.findOneId({
      where: {
        id: Not(id),
        classroomId: input.classroomId,
        subjectId: input.subjectId,
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
    input: [UpdateClassRoomItemInput],
    idUser: number,
    typeUser: string,
  ): Promise<boolean> {
    let objects: [UpdateClassRoomItemInput];

    const promisesLog = input.map(async item => {
      const wobjId = await super.findOneId({
        where: [
          {
            id: Not(item.id),
            classroomId: item.classroomId,
            subjectId: item.subjectId,
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
    input: CreateClassRoomItemInput,
    idUser: number,
    typeUser: string,
  ): Promise<ClassRoomItemEntity> {
    const wobjId = await super.findOneId({
      where: [{ classroomId: input.classroomId, subjectId: input.subjectId }],
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
    input: [CreateClassRoomItemInput],
    idUser: number,
    typeUser: string,
  ): Promise<ClassRoomItemEntity[]> {
    let objects: [CreateClassRoomItemInput];

    const promisesLog = input.map(async item => {
      const wobjId = await super.findOneId({
        where: [{ classroomId: item.classroomId, subjectId: item.subjectId }],
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
