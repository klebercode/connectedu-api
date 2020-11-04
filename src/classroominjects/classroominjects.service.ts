import { Inject, ConflictException } from '@nestjs/common';
import { Connection, Not } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { CreateClassRoomInjectInput } from './types/create-classroominject.input';
import { UpdateClassRoomInjectInput } from './types/update-classroominject.input';
import { ClassRoomInjectEntity } from './entities/classroominject.entity';
import { UserLogsService } from '../userlogs/userlogs.service';

@CustomersServiceDecorator()
export class ClassRoomInjectsService extends ServiceDefault<
  ClassRoomInjectEntity,
  CreateClassRoomInjectInput,
  UpdateClassRoomInjectInput
> {
  constructor(
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
    private readonly userLogsService: UserLogsService,
  ) {
    super(connection, ClassRoomInjectEntity, userLogsService);
  }

  //@Unique(['classroomItemId'])

  async update(
    id: number,
    input: UpdateClassRoomInjectInput,
    idUser: number,
    typeUser: string,
  ): Promise<ClassRoomInjectEntity> {
    const wobjId = await super.findOneId({
      where: {
        id: Not(id),
        classroomItemId: input.classroomItemId,
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
    input: [UpdateClassRoomInjectInput],
    idUser: number,
    typeUser: string,
  ): Promise<boolean> {
    let objects: [UpdateClassRoomInjectInput];

    const promisesLog = input.map(async item => {
      const wobjId = await super.findOneId({
        where: [{ id: Not(item.id), classroomItemId: item.classroomItemId }],
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
    input: CreateClassRoomInjectInput,
    idUser: number,
    typeUser: string,
  ): Promise<ClassRoomInjectEntity> {
    const wobjId = await super.findOneId({
      where: [{ classroomItemId: input.classroomItemId }],
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
    input: [CreateClassRoomInjectInput],
    idUser: number,
    typeUser: string,
  ): Promise<ClassRoomInjectEntity[]> {
    let objects: [CreateClassRoomInjectInput];

    const promisesLog = input.map(async item => {
      const wobjId = await super.findOneId({
        where: [{ classroomItemId: item.classroomItemId }],
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
