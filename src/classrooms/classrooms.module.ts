import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { ClassRoomsService } from './classrooms.service';
import { ClassRoomsResolver } from './resolvers/classrooms.resolvers';

import { CustomersModule } from '../customers/customers.module';
import { CompaniesModule } from '../companies/companies.module';
import { YearsModule } from '../years/years.module';
import { UserCentesModule } from './../usercenter/usercenters.module';
import { UserLogsModule } from '../userlogs/userlogs.module';

@Module({
  imports: [
    UserCentesModule,
    CustomersModule,
    CompaniesModule,
    YearsModule,
    UserLogsModule,
  ],
  providers: [ClassRoomsService, DateScalar, ClassRoomsResolver],
  exports: [ClassRoomsService],
})
export class ClassRoomsModule {}
