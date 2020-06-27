import { Inject } from '@nestjs/common';
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

  async create(user: CreateUsersInput): Promise<UserEntity> {
    const createdUser = await this.usersRepository.save(user);
    return createdUser;
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
  ): Promise<UserEntity> {
    await this.usersRepository.update(id, { ...user });
    return this.findOneById(id);
  }
}
