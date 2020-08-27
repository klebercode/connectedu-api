import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { MyContext } from '../../common/types/mycontext';

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
  async get(@Args('id') id: number): Promise<Customer> {
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

  @Query(() => [Customer], { name: 'customerMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<Customer[]> {
    try {
      const obj = await this.customersService.findByIds(ids);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'getMany', this.nameApp);
    }
  }

  @Query(() => [Customer], { name: 'customerAll' })
  async getAll(): Promise<Customer[]> {
    try {
      return this.customersService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  @Mutation(() => Customer, { name: 'customerCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateCustomerInput,
  ): Promise<Customer> {
    try {
      const { user } = context.req;
      const obj = await this.customersService.create(
        { ...input },
        user['id'],
        user['type'],
      );
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => [Customer], { name: 'customerCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateCustomerInput] })
    input: [CreateCustomerInput],
  ): Promise<Customer[]> {
    try {
      const { user } = context.req;
      return await this.customersService.createMany(
        input,
        user['id'],
        user['type'],
      );
    } catch (error) {
      CustomException.catch(error, 'createMany', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'customerDelete' })
  async delete(
    @Context() context: MyContext,
    @Args('id') id: number,
  ): Promise<boolean> {
    try {
      const { user } = context.req;
      const obj = await this.customersService.remove(
        id,
        user['id'],
        user['type'],
      );
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'customerDeleteMany' })
  async deleteMany(
    @Context() context: MyContext,
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    try {
      const { user } = context.req;
      const obj = await this.customersService.removeMany(
        ids,
        user['id'],
        user['type'],
      );
      if (!obj) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'deleteMany', this.nameApp);
    }
  }

  @Mutation(() => Customer, { name: 'customerUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreateCustomerInput,
  ): Promise<Customer> {
    try {
      const { user } = context.req;
      const obj = await this.customersService.update(
        id,
        { ...input },
        user['id'],
        user['type'],
      );
      return obj;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }
}
