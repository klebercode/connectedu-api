import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/global.service';

import * as bcryptjs from 'bcryptjs';

import { UserEntity } from './entities/user.entity';
import { CreateUsersInput } from './types/create-user.input';
import { UpdateUsersInput } from './types/update-user.input';

@CustomersServiceDecorator()
export class UsersService extends ServiceDefault<
  UserEntity,
  CreateUsersInput,
  UpdateUsersInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, UserEntity);
  }

  async getByEmailLogin(login: string): Promise<UserEntity> {
    const obj = await this.repository.findOne({
      where: [{ login: login }, { email: login }],
    });
    return obj;
  }

  async updateCodeToken(id: number, codeToken: number): Promise<boolean> {
    await this.repository.update(id, { codeToken });
    return true;
  }

  async updatePassword(
    id: number,
    password: string,
    idUser: any,
  ): Promise<boolean> {
    const password_hash = await bcryptjs.hash(password, 10);

    await this.repository.update(id, { password: password_hash });
    return this.updateCodeToken(id, 0);
  }

  async create(user: CreateUsersInput, idUser: any): Promise<UserEntity> {
    user.password = await bcryptjs.hash(user.password, 10);
    return await super.create(user, idUser);
  }
}
