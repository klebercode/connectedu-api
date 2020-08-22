import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { ServicePublic } from '../common/services/public.service';

import { Customer } from './entities/customer.object';
import { CreateCustomerInput } from './types/create-customer.input';
import { UpdateCustomerInput } from './types/update-customer.input';

@Injectable()
export class CustomersService extends ServicePublic<
  Customer,
  CreateCustomerInput,
  UpdateCustomerInput
> {
  constructor(@InjectConnection() connectionPublic: Connection) {
    super(connectionPublic, Customer);
  }

  async findHost(host: string): Promise<Customer> {
    if (!host) {
      return null;
    }
    const obj = await this.repository.findOne({ host });
    if (!obj) {
      return null;
    }
    return obj;
  }
}
