import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { CreateCustomerInput } from '../types/create-customer.input';
import { Customer } from '../entities/customer.object';
import { CustomersService } from '../customers.service';

@UseGuards(GqlAuthGuard)
@Resolver(of => Customer)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Query(() => Customer, { name: 'customer' })
  async getCustomer(@Args('id') id: number): Promise<Customer> {
    return await this.customersService.findOneById(id);
  }

  @Query(() => [Customer], { name: 'customerAll' })
  async getCustomers(): Promise<Customer[]> {
    return await this.customersService.findAll();
  }

  @Mutation(() => Customer, { name: 'customerCreate' })
  async createCustomer(
    @Args('input') input: CreateCustomerInput,
  ): Promise<Customer> {
    const obj = await this.customersService.create({ ...input });
    return obj;
  }

  @Mutation(() => Customer, { name: 'customerUpdate' })
  async updateCustomer(
    @Args('id') id: number,
    @Args('input') input: CreateCustomerInput,
  ): Promise<Customer> {
    const obj = await this.customersService.update(id, { ...input });
    return obj;
  }

  @Mutation(() => Boolean, { name: 'customerDelete' })
  async deleteCustomer(@Args('id') id: number): Promise<boolean> {
    await this.customersService.remove(id);
    const obj = await this.customersService.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }
}
