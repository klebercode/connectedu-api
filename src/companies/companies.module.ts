import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { CompaniesResolver } from './resolvers/companies.resolver';
import { CompaniesService } from './companies.service';

import { StatesModule } from '../states/states.module';
import { CitiesModule } from '../cities/cities.module';
import { CustomersModule } from '../customers/customers.module';
import { UserCentesModule } from './../usercenter/usercenters.module';

@Module({
  imports: [UserCentesModule, CustomersModule, StatesModule, CitiesModule],
  providers: [CompaniesResolver, CompaniesService, DateScalar],
  exports: [CompaniesService],
})
export class CompaniesModule {}
