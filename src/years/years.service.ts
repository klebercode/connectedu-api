import { Inject, ConflictException } from '@nestjs/common';
import { Connection, Not } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { YearEntity } from './entities/year.entity';
import { CreateYearInput } from './types/create-year.input';
import { UpdateYearInput } from './types/update-year.input';
import { UserLogsService } from '../userlogs/userlogs.service';

@CustomersServiceDecorator()
export class YearsService extends ServiceDefault<
  YearEntity,
  CreateYearInput,
  UpdateYearInput
> {
  constructor(
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
    private readonly userLogsService: UserLogsService,
  ) {
    super(connection, YearEntity, userLogsService);
  }

  //@Unique(['year'])
  async update(
    id: number,
    input: UpdateYearInput,
    idUser: number,
    typeUser: string,
  ): Promise<YearEntity> {
    const wobjId = await super.findOneId({
      where: {
        id: Not(id),
        year: input.year,
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
    input: [UpdateYearInput],
    idUser: number,
    typeUser: string,
  ): Promise<boolean> {
    let objects: [UpdateYearInput];

    const promisesLog = input.map(async item => {
      const wobjId = await super.findOneId({
        where: [{ id: Not(item.id), year: item.year }],
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
    input: CreateYearInput,
    idUser: number,
    typeUser: string,
  ): Promise<YearEntity> {
    const wobjId = await super.findOneId({
      where: [{ year: input.year }],
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
    input: [CreateYearInput],
    idUser: number,
    typeUser: string,
  ): Promise<YearEntity[]> {
    let objects: [CreateYearInput];

    const promisesLog = input.map(async item => {
      const wobjId = await super.findOneId({
        where: [{ year: item.year }],
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
