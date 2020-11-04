import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { MigrationsService } from './migrations.service';
import { MigrationsClassRoomItemsResolver } from './resolvers/classroomitems.resolvers';

import { UserCentesModule } from './../usercenter/usercenters.module';
import { CustomersModule } from '../customers/customers.module';
import { UserLogsModule } from '../userlogs/userlogs.module';
import { ClassRoomsModule } from '../classrooms/classrooms.module';
import { ClassRoomItemsModule } from '../classroomitems/classroomitems.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { TeachersModule } from '../teachers/teachers.module';
import { StudentsModule } from '../students/students.module';
import { ResponsiblesModule } from '../responsibles/responsibles.module';
import { StudentInformationsModule } from '../studentinformations/studentinformations.module';
import { StatesModule } from '../states/states.module';
import { CitiesModule } from '../cities/cities.module';
import { YearsModule } from '../years/years.module';

@Module({
  imports: [
    UserCentesModule,
    CustomersModule,
    UserLogsModule,
    ClassRoomsModule,
    ClassRoomItemsModule,
    SubjectsModule,
    TeachersModule,
    StudentsModule,
    ResponsiblesModule,
    StudentInformationsModule,
    StatesModule,
    CitiesModule,
    YearsModule,
  ],
  providers: [MigrationsService, DateScalar, MigrationsClassRoomItemsResolver],
})
export class MigrationsModule {}
