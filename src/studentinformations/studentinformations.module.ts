import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { StudentInformationsService } from './studentinformations.service';
import { StudentInformationsResolver } from './resolvers/studentinformations.resolvers';

import { UserCentesModule } from './../usercenter/usercenters.module';
import { CustomersModule } from '../customers/customers.module';

import { ClassRoomsModule } from '../classrooms/classrooms.module';
import { StudentsModule } from '../students/students.module';
import { ResponsiblesModule } from '../responsibles/responsibles.module';
import { YearsModule } from '../years/years.module';
import { UserLogsModule } from '../userlogs/userlogs.module';

@Module({
  imports: [
    UserCentesModule,
    CustomersModule,
    ClassRoomsModule,
    StudentsModule,
    ResponsiblesModule,
    YearsModule,
    UserLogsModule,
  ],
  providers: [
    StudentInformationsService,
    DateScalar,
    StudentInformationsResolver,
  ],
  exports: [StudentInformationsService],
})
export class StudentInformationsModule {}
