import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { EmployeesResolver } from './resolvers/employees.resolver';
import { EmployeesService } from './employees.service';

import { UsersModule } from '../users/users.module';
import { StatesModule } from '../states/states.module';
import { CitiesModule } from '../cities/cities.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [UsersModule, CustomersModule, StatesModule, CitiesModule],
  providers: [EmployeesResolver, EmployeesService, DateScalar],
  exports: [EmployeesService],
})
export class EmmployeesModule {}
