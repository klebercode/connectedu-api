import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { StudentCallsService } from './studentcalls.service';
import { StudentCallsResolver } from './resolvers/studentcalls.resolvers';

import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';

import { StudentsModule } from '../students/students.module';
import { SubjectsModule } from '../subjects/subjects.module';

@Module({
  imports: [UsersModule, CustomersModule, StudentsModule, SubjectsModule],
  providers: [StudentCallsService, DateScalar, StudentCallsResolver],
  exports: [StudentCallsService],
})
export class StudentCallsModule {}
