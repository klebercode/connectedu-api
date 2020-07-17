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

import { EmployeeEntity } from '../entities/employee.entity';
import { EmployeesService } from '../employees.service';
import { CreateEmploeeInput } from '../types/create-employee.input';

import { MyContext } from '../../common/types/myContext';
import { StatesService } from '../../states/states.service';
import { UsersService } from '../../users/users.service';
import { CitiesService } from '../../cities/cities.service';
import { UserEntity } from '../../users/entities/user.entity';
import {
  HttpExceptionFilter,
  CustomException,
} from '../../common/filters/http-exception.filter';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => EmployeeEntity)
@UseFilters(HttpExceptionFilter)
export class EmployeesResolver {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly usersService: UsersService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {}
  private nameApp = 'Funcionário';

  @Query(() => EmployeeEntity, { name: 'employee' })
  async getEmployee(@Args('id') id: number): Promise<EmployeeEntity> {
    try {
      const obj = await this.employeesService.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  @Query(() => [EmployeeEntity], { name: 'employeeAll' })
  async getEmployees(): Promise<EmployeeEntity[]> {
    try {
      return this.employeesService.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
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
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  @Mutation(() => Boolean, { name: 'employeeDelete' })
  async deteleEmployee(@Args('id') id: number): Promise<boolean> {
    try {
      await this.employeesService.remove(id);
      const employee = await this.employeesService.findOneById(id);
      if (!employee) {
        return true;
      }
      return false;
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
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
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

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

  @ResolveField(() => UserEntity)
  async userCreated(@Parent() employee: EmployeeEntity): Promise<any> {
    const id = employee.userCreatedId;
    if (!id) {
      return null;
    }
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }

  @ResolveField(() => UserEntity)
  async userUpdated(@Parent() employee: EmployeeEntity) {
    const id = employee.userUpdatedId;
    if (!id) {
      return null;
    }
    try {
      return this.usersService.findOneById(id);
    } catch (error) {
      CustomException.catch(error, 'get', 'Usuário');
    }
  }
}
