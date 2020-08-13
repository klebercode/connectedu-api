import { UseGuards, UseFilters, NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Context,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';

import { EmployeeEntity, EmployeePaginated } from '../entities/employee.entity';
import { EmployeesService } from '../employees.service';
import { CreateEmploeeInput } from '../types/create-employee.input';
import { UpdateEmploeeInput } from '../types/update-employee.input';

import { MyContext } from '../../common/types/mycontext';
import { StatesService } from '../../states/states.service';
import { CitiesService } from '../../cities/cities.service';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';
import { ResolverDefault } from '../../common/resolvers/schema.resolver';
import { PaginationArgs } from '../../common/pages';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => EmployeeEntity)
@UseFilters(HttpExceptionFilter)
export class EmployeesResolver extends ResolverDefault<
  EmployeeEntity,
  CreateEmploeeInput,
  UpdateEmploeeInput
> {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {
    super('Funcionário', employeesService);
  }

  @Query(() => EmployeeEntity, { name: 'employee' })
  async get(@Args('id') id: number): Promise<EmployeeEntity> {
    return super.get(id);
  }

  @Query(() => [EmployeeEntity], { name: 'employeeAll' })
  async getAll(): Promise<EmployeeEntity[]> {
    return super.getAll();
  }

  @Query(() => EmployeePaginated, { name: 'employeePages' })
  async getPagenated(
    @Args() pagination: PaginationArgs,
  ): Promise<EmployeePaginated> {
    return super.getPagenated(pagination);
  }

  @Query(() => [EmployeeEntity], { name: 'employeetMany' })
  async getMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<EmployeeEntity[]> {
    return super.getMany(ids);
  }

  @Mutation(() => EmployeeEntity, { name: 'employeeCreate' })
  async create(
    @Context() context: MyContext,
    @Args('input') input: CreateEmploeeInput,
  ): Promise<EmployeeEntity> {
    return super.create(context, input);
  }

  @Mutation(() => [EmployeeEntity], { name: 'employeeCreateMany' })
  async createMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [CreateEmploeeInput] })
    input: [CreateEmploeeInput],
  ): Promise<EmployeeEntity[]> {
    return super.createMany(context, input);
  }

  @Mutation(() => Boolean, { name: 'employeeDelete' })
  async detele(@Args('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @Mutation(() => Boolean, { name: 'employeeDeleteMany' })
  async deleteMany(
    @Args({ name: 'ids', type: () => [Number] })
    ids: [number],
  ): Promise<boolean> {
    return super.deleteMany(ids);
  }

  @Mutation(() => EmployeeEntity, { name: 'employeeUpdate' })
  async update(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: UpdateEmploeeInput,
  ): Promise<EmployeeEntity> {
    return super.update(context, id, input);
  }

  @Mutation(() => Boolean, { name: 'employeeUpdateMany' })
  async updateMany(
    @Context() context: MyContext,
    @Args({ name: 'input', type: () => [UpdateEmploeeInput] })
    input: [UpdateEmploeeInput],
  ): Promise<boolean> {
    return super.updateMany(context, input);
  }

  // **************************************  Resolucao de Campos

  @ResolveField('state')
  async state(@Parent() employee: EmployeeEntity) {
    const id = employee.stateId;
    if (!id) {
      return null;
    }
    try {
      return this.statesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Estado');
    }
  }

  @ResolveField('city')
  async city(@Parent() employee: EmployeeEntity) {
    const id = employee.cityId;
    if (!id) {
      return null;
    }
    try {
      return this.citiesService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Cidade');
    }
  }
}
