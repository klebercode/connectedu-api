import { Inject } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import * as bcryptjs from 'bcryptjs';

import { UserEntity } from './entities/user.entity';
import { CreateUsersInput } from './types/create-user.input';
import { UpdateUsersInput } from './types/update-user.input';

@CustomersServiceDecorator()
export class UsersService {
  private usersRepository: Repository<UserEntity>;

  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.usersRepository = this.connection.getRepository(UserEntity);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOneById(id: number): Promise<UserEntity> {
    if (!id) {
      return null;
    }
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async getByEmailLogin(login: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      where: [{ login: login }, { email: login }],
    });
    return user;
  }

  async create(user: CreateUsersInput, idUser: any): Promise<UserEntity> {
    user.password = await bcryptjs.hash(user.password, 10);
    const obj = await this.usersRepository.save({
      ...user,
      userCreatedId: idUser,
      userUpdatedId: idUser,
    });
    return obj;
  }

  async remove(id: number): Promise<boolean> {
    await this.usersRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async updateCodeToken(id: number, codeToken: number): Promise<boolean> {
    await this.usersRepository.update(id, { codeToken });
    return true;
  }

  async updatePassword(
    id: number,
    password: string,
    idUser: any,
  ): Promise<boolean> {
    const password_hash = await bcryptjs.hash(password, 10);
    await this.usersRepository.update(id, { password: password_hash });
    return this.updateCodeToken(id, 0);
  }

  async update(
    id: number,
    user: Partial<UpdateUsersInput>,
    idUser: any,
  ): Promise<UserEntity> {
    await this.usersRepository.update(id, {
      ...user,
      userUpdatedId: idUser,
    });
    return this.findOneById(id);
  }
}
