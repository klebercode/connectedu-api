import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';

import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateCustomerInput } from '../types/create-customer.input';
import { Customer } from '../entities/customer.object';
import { CustomersService } from '../customers.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard)
@Resolver(of => Customer)
@UseFilters(HttpExceptionFilter)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}
  private nameApp = 'Customer';

  @Query(() => Customer, { name: 'customer' })
  async getCustomer(@Args('id') id: number): Promise<Customer> {
    try {
      const obj = await this.customersService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [Customer], { name: 'customerAll' })
  async getCustomers(): Promise<Customer[]> {
    try {
      return this.customersService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => Customer, { name: 'customerCreate' })
  async createCustomer(
    @Args('input') input: CreateCustomerInput,
  ): Promise<Customer> {
    try {
      const obj = await this.customersService.create({ ...input });
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'customerDelete' })
  async deleteCustomer(@Args('id') id: number): Promise<boolean> {
    try {
      await this.customersService.remove(id);
      const obj = await this.customersService.findOneById(id);
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => Customer, { name: 'customerUpdate' })
  async updateCustomer(
    @Args('id') id: number,
    @Args('input') input: CreateCustomerInput,
  ): Promise<Customer> {
    try {
      const obj = await this.customersService.update(id, { ...input });
      return obj;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }
}
