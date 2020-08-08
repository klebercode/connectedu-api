import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { StudentGradesService } from './studentgrades.service';
import { StudentGradesResolver } from './resolvers/studentgrades.resolvers';

import { CustomersModule } from '../customers/customers.module';

import { StudentsModule } from '../students/students.module';
import { YearsModule } from '../years/years.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { UserCentesModule } from './../usercenter/usercenters.module';

@Module({
  imports: [
    UserCentesModule,
    CustomersModule,
    StudentsModule,
    SubjectsModule,
    YearsModule,
  ],
  providers: [StudentGradesService, DateScalar, StudentGradesResolver],
  exports: [StudentGradesService],
})
export class StudentGradesModule {}
