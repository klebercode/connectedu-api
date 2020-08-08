import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { StudentOccurrencesService } from './studentinformations.service';
import { StudentOccurrencesResolver } from './resolvers/studentoccurrences.resolvers';

import { UserCentesModule } from './../usercenter/usercenters.module';
import { CustomersModule } from '../customers/customers.module';

import { StudentsModule } from '../students/students.module';
import { OccurrencesModule } from '../occurrences/occurrences.module';
import { TeachersModule } from '../teachers/teachers.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [
    UserCentesModule,
    CustomersModule,
    StudentsModule,
    OccurrencesModule,
    EmployeesModule,
    TeachersModule,
    SubjectsModule,
  ],
  providers: [
    StudentOccurrencesService,
    DateScalar,
    StudentOccurrencesResolver,
  ],
  exports: [StudentOccurrencesService],
})
export class StudentOccurrencesModule {}
