import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { ClassRoomInjectsService } from './classroominjects.service';
import { ClassRoomInjectsResolver } from './resolvers/classroominjects.resolvers';

import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';

import { ClassRoomItemsModule } from '../classroomitems/classroomitems.module';
import { SubjectsModule } from '../subjects/subjects.module';

@Module({
  imports: [UsersModule, CustomersModule, ClassRoomItemsModule, SubjectsModule],
  providers: [ClassRoomInjectsService, DateScalar, ClassRoomInjectsResolver],
  exports: [ClassRoomInjectsService],
})
export class ClassRoomInjectsModule {}
