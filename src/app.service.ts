import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CustomersServiceDecorator } from './customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from './customers/customers.module';

@CustomersServiceDecorator()
export class AppService {
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {}

  getHello(): string {
    return 'Hello World!'; //this.connection.name;
  }
}
