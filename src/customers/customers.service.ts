import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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
  constructor(
    @InjectRepository(Customer)
    private repository: Repository<Customer>,
  ) {
    super(repository);
  }
}
