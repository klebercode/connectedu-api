import { Inject, NotFoundException, HttpException } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as bcryptjs from 'bcryptjs';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { UserCenterEntity } from './entities/usercenter.entity';
import { CreateUserCenterInput } from './types/create-usercenter.input';
import { UpdateUserCenterInput } from './types/update-usercenter.input';

@CustomersServiceDecorator()
export class UserCentersService extends ServiceDefault<
  UserCenterEntity,
  CreateUserCenterInput,
  UpdateUserCenterInput
> {
  private connectionLocal: Connection;

  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, UserCenterEntity);
    this.connectionLocal = connection;
  }

  // metodo usado no momento da criação da chave
  // de acesso
  async createUserCenter(input: any): Promise<Boolean> {
    const queryRunner = this.connectionLocal.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(UserCenterEntity, input);

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(
        'Erro na rotina de criação da Chave de Acesso !',
        error,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async getByEmailLogin(login: string): Promise<UserCenterEntity> {
    const obj = await this.repository.findOne({
      where: [{ login: login }, { email: login }],
    });
    return obj;
  }

  async updateLoginPassword(
    id: number,
    login: string,
    password: string,
    idUser: any,
  ): Promise<boolean> {
    const password_hash = await bcryptjs.hash(password, 10);

    await this.repository.update(id, { login: login, password: password_hash });
    return true;
  }
}
