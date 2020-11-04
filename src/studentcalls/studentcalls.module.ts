import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { StudentCallsService } from './studentcalls.service';
import { StudentCallsResolver } from './resolvers/studentcalls.resolvers';

import { CustomersModule } from '../customers/customers.module';

import { StudentsModule } from '../students/students.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { UserCentesModule } from './../usercenter/usercenters.module';
import { UserLogsModule } from '../userlogs/userlogs.module';

@Module({
  imports: [
    UserCentesModule,
    CustomersModule,
    StudentsModule,
    SubjectsModule,
    UserLogsModule,
  ],
  providers: [StudentCallsService, DateScalar, StudentCallsResolver],
  exports: [StudentCallsService],
})
export class StudentCallsModule {}
