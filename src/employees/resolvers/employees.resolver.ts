import { UseGuards, HttpException } from '@nestjs/common';
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

import { EmployeeEntity } from '../entities/employee.entity';
import { EmployeesService } from '../employees.service';
import { CreateEmploeeInput } from '../types/create-employee.input';

import { MyContext } from '../../common/types/myContext';
import { StatesService } from '../../states/states.service';
import { UsersService } from '../../users/users.service';
import { CitiesService } from '../../cities/cities.service';
import { UserEntity } from '../../users/entities/user.entity';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => EmployeeEntity)
export class EmployeesResolver {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly usersService: UsersService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {}

  @Query(() => EmployeeEntity, { name: 'employee' })
  async getEmployee(@Args('id') id: number): Promise<EmployeeEntity> {
    return await this.employeesService.findOneById(id);
  }

  @Query(() => [EmployeeEntity], { name: 'employeeAll' })
  async getEmployees(): Promise<EmployeeEntity[]> {
    return await this.employeesService.findAll();
  }

  @Mutation(() => EmployeeEntity, { name: 'employeeCreate' })
  async createEmployee(
    @Context() context: MyContext,
    @Args('input') input: CreateEmploeeInput,
  ): Promise<EmployeeEntity> {
    try {
      const { user } = context.req;
      const employee = await this.employeesService.create(input, user['id']);

      return employee;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => EmployeeEntity, { name: 'employeeUpdate' })
  async updateEmployee(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreateEmploeeInput,
  ): Promise<EmployeeEntity> {
    try {
      const { user } = context.req;
      const employee = await this.employeesService.update(
        id,
        { ...input },
        user['id'],
      );

      return employee;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'employeeDelete' })
  async deteleEmployee(@Args('id') id: number): Promise<boolean> {
    await this.employeesService.remove(id);
    const employee = await this.employeesService.findOneById(id);
    if (!employee) {
      return true;
    }
    return false;
  }

  @ResolveField('state')
  async state(@Parent() employee: EmployeeEntity) {
    const id = employee.stateId;
    if (!id) {
      return null;
    }
    return this.statesService.findOneById(id);
  }

  @ResolveField('city')
  async city(@Parent() employee: EmployeeEntity) {
    const id = employee.cityId;
    if (!id) {
      return null;
    }
    return this.citiesService.findOneById(id);
  }

  @ResolveField(() => UserEntity)
  async userCreated(@Parent() employee: EmployeeEntity): Promise<any> {
    const id = employee.userCreatedId;
    if (!id) {
      return null;
    }
    return this.usersService.findOneById(id);
  }

  @ResolveField(() => UserEntity)
  async userUpdated(@Parent() employee: EmployeeEntity) {
    const id = employee.userUpdatedId;
    if (!id) {
      return null;
    }
    return this.usersService.findOneById(id);
  }
}
