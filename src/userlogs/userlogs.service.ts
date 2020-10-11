import { Connection, Model } from 'mongoose';
import {
  Inject,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION_MONGO } from '../connectmongodb/connectmongodb.module';
import { UserLog } from './types/userlog.interface';
import { CreateUserLogDTO } from './types/create.userlog.dto';
import { UserLogSchema } from './entities/userlog.schema';

@CustomersServiceDecorator()
export class UserLogsService {
  private readonly model: Model<UserLog>;

  constructor(@Inject(CUSTOMER_CONNECTION_MONGO) connection: Connection) {
    this.model = connection.model('userlog', UserLogSchema);
  }

  async findAll(): Promise<UserLog[]> {
    let obj: any;

    try {
      obj = await this.model.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar lista registros de logs !',
        error,
      );
    }

    return obj;
  }

  async findOneById(userLogId: string): Promise<UserLog> {
    let obj: any;

    try {
      obj = await this.model.findById(userLogId).exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar pesquisa registro de log !',
        error,
      );
    }
    return obj;
  }

  async create(createUserLogDTO: CreateUserLogDTO): Promise<UserLog> {
    let obj: any;

    try {
      obj = await this.model.create(createUserLogDTO);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar salvar registro especifico de log !',
        error,
      );
    }

    return obj;
  }

  async update(
    userLogId: string,
    createUserLogDTO: CreateUserLogDTO,
  ): Promise<UserLog> {
    let obj: any;

    try {
      obj = await this.model.findByIdAndUpdate(userLogId, createUserLogDTO, {
        new: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar salvar alteração de registro especifico de log !',
        error,
      );
    }

    return obj;
  }

  async remove(userLogId: string): Promise<any> {
    let obj: any;

    try {
      obj = await this.model.findByIdAndRemove(userLogId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar deletar registro especifico de log !',
        error,
      );
    }

    return obj;
  }
}
