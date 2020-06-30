import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { ClassRoomsService } from './classrooms.service';
import { ClassRoomsResolver } from './resolvers/classrooms.resolvers';

import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';
import { CompaniesModule } from '../companies/companies.module';
import { YearsModule } from '../years/years.module';

@Module({
  imports: [UsersModule, CustomersModule, CompaniesModule, YearsModule],
  providers: [ClassRoomsService, DateScalar, ClassRoomsResolver],
  exports: [ClassRoomsService],
})
export class ClassRoomsModule {}
