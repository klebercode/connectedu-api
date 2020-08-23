import { Connection, Model, models, Schema } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION_MONGO } from '../connectmongodb/connectmongodb.module';
import { UserLog } from './entities/userlog.interface';
import { CreateUserLogDTO } from './entities/create.userlog.dto';
import { UserLogSchema } from './entities/userlog.schema';

@Injectable()
@CustomersServiceDecorator()
export class UserLogsService {
  private readonly model: Model<UserLog>;

  constructor(@Inject(CUSTOMER_CONNECTION_MONGO) connection: Connection) {
    this.model = connection.model('userlog', UserLogSchema);
  }

  async findAll(): Promise<UserLog[]> {
    const customers = await this.model.find().exec();
    return customers;
  }

  async findOneById(userLogId: string): Promise<UserLog> {
    const customer = await this.model.findById(userLogId).exec();
    return customer;
  }

  async create(createUserLogDTO: CreateUserLogDTO): Promise<UserLog> {
    const newCustomer = new this.model(createUserLogDTO);
    return newCustomer.save();
  }

  async update(
    userLogId: string,
    createUserLogDTO: CreateUserLogDTO,
  ): Promise<UserLog> {
    const updatedCustomer = await this.model.findByIdAndUpdate(
      userLogId,
      createUserLogDTO,
      { new: true },
    );
    return updatedCustomer;
  }

  async remove(userLogId: string): Promise<any> {
    const deletedCustomer = await this.model.findByIdAndRemove(userLogId);
    return deletedCustomer;
  }
}
