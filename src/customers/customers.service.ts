import { Injectable } from '@nestjs/common';
import { CreateCustomerInput } from './types/create-customer.input';
import { Customer } from './entities/customer.object';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async create(customer: CreateCustomerInput): Promise<Customer> {
    const customerCreated = await this.customersRepository.save(customer);
    return customerCreated;
  }

  async findOneById(id: number): Promise<Customer> {
    const customer = await this.customersRepository.findOne(id);
    if (!customer) {
      return null;
    }
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    return await this.customersRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }

  async update(id: number, customer: Partial<Customer>): Promise<Customer> {
    await this.customersRepository.update(id, customer);
    return this.findOneById(id);
  }
}
