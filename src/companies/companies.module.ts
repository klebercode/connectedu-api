import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { CompaniesResolver } from './resolvers/companies.resolver';
import { CompaniesService } from './companies.service';

import { UsersModule } from '../users/users.module';
import { StatesModule } from '../states/states.module';
import { CitiesModule } from '../cities/cities.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [UsersModule, CustomersModule, StatesModule, CitiesModule],
  providers: [CompaniesResolver, CompaniesService, DateScalar],
})
export class CompaniesModule {}
