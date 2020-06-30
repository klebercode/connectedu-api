import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { ClassRoomItemsService } from './classroomitems.service';
import { ClassRoomItemsResolver } from './resolvers/classroomitems.resolvers';

import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';

import { TeachersModule } from '../teachers/teachers.module';
import { ClassRoomsModule } from '../classrooms/classrooms.module';
import { SubjectsModule } from '../subjects/subjects.module';

@Module({
  imports: [
    UsersModule,
    CustomersModule,
    TeachersModule,
    ClassRoomsModule,
    SubjectsModule,
  ],
  providers: [ClassRoomItemsService, DateScalar, ClassRoomItemsResolver],
  exports: [ClassRoomItemsService],
})
export class ClassRoomItemsModule {}
