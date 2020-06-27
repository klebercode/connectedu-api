import { Inject, GoneException } from '@nestjs/common';
import { CreateUsersInput } from './types/create-user.input';
import { UserEntity } from './entities/user.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

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

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({ email });
  }

  async create(user: CreateUsersInput, idUser: any): Promise<UserEntity> {
    try {
      const obj = await this.usersRepository.save({
        ...user,
        userCreatedId: idUser,
      });
      return obj;
    } catch (error) {
      throw new GoneException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    await this.usersRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async update(
    id: number,
    user: Partial<CreateUsersInput>,
    idUser: any,
  ): Promise<UserEntity> {
    try {
      await this.usersRepository.update(id, {
        ...user,
        userUpdatedId: idUser,
      });
      return this.findOneById(id);
    } catch (error) {
      throw new GoneException(error);
    }
  }
}
