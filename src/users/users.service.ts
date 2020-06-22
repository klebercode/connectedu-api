import { Inject, NotFoundException } from '@nestjs/common';
import { CreateUsersInput } from './types/create-user.input';
import { UserEntity } from './entities/user.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersService } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersService()
export class UsersService {
  private usersRepository: Repository<UserEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.usersRepository = this.connection.getRepository(UserEntity);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOneById(id: number): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(id);
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

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(
    id: number,
    user: Partial<CreateUsersInput>,
  ): Promise<UserEntity> {
    await this.usersRepository.update(id, { ...user });
    return this.findOneById(id);
  }
}
