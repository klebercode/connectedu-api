import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CustomersService } from './customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from './customers/customers.module';

@CustomersService()
export class AppService {
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {}

  getHello(): string {
    return this.connection.name;
  }
}
