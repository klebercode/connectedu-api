import { Inject, NotFoundException, HttpException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { UserTypeEntity } from './types/usertypes.object';

import { UserEntity } from '../users/entities/user.entity';
import { TypeUser } from '../common/enums/enum-usertoken';

@CustomersServiceDecorator()
export class UserTypessService {
  connection: Connection;
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    this.connection = connection;
  }

  async findOneById(id: number, typeUser: string): Promise<UserTypeEntity> {
    const userType = new UserTypeEntity();

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(UserEntity, id);

      userType.idUser = user.id;
      userType.name = user.name;
      userType.email = user.email;
      userType.userType = TypeUser.I;

      return userType;
    } catch (error) {
      throw new HttpException('Erro ao consultar usuário do registro !', error);
    } finally {
      await queryRunner.release();
    }
  }
}
