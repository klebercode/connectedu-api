import { Connection, Model, models, Schema } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Injectable, Inject } from '@nestjs/common';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION_MONGO } from '../tenants/tenants.module';
import { UserLog, UserLogSchema } from './entities/userlog.schema';
import { CreateUserLogDto } from './entities/create.userlog.dto';
import { getMongoManager } from 'typeorm';

@Injectable()
@CustomersServiceDecorator()
export class UserLogsService {
  private readonly model: Model<UserLog>;

  constructor(@Inject(CUSTOMER_CONNECTION_MONGO) connection: Connection) {
    //console.log(connection);
    this.model = connection.model(UserLog.name, UserLogSchema);
    console.log(this.model);
  }

  /*
  async create(createUserLogDto: CreateUserLogDto): Promise<UserLog> {
    const userlog = new this.model(createUserLogDto);
    return userlog.save();
  }

  */

  async create(): Promise<UserLog> {
    const test = {
      bio: 'teste bio',
      name: 'name teste',
      website: 'website teste',
    };

    const userlog = new this.model(test);
    return userlog.save();
  }

  async findAll(): Promise<UserLog[]> {
    return this.model.find().exec();
  }
}
