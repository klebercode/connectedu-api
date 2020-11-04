import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { ClassRoomItemsService } from './classroomitems.service';
import { ClassRoomItemsResolver } from './resolvers/classroomitems.resolvers';

import { UserCentesModule } from './../usercenter/usercenters.module';
import { CustomersModule } from '../customers/customers.module';

import { TeachersModule } from '../teachers/teachers.module';
import { ClassRoomsModule } from '../classrooms/classrooms.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { UserLogsModule } from '../userlogs/userlogs.module';

@Module({
  imports: [
    UserCentesModule,
    CustomersModule,
    TeachersModule,
    ClassRoomsModule,
    SubjectsModule,
    UserLogsModule,
  ],
  providers: [ClassRoomItemsService, DateScalar, ClassRoomItemsResolver],
  exports: [ClassRoomItemsService],
})
export class ClassRoomItemsModule {}
