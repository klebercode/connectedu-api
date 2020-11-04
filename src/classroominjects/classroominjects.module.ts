import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { ClassRoomInjectsService } from './classroominjects.service';
import { ClassRoomInjectsResolver } from './resolvers/classroominjects.resolvers';

import { CustomersModule } from '../customers/customers.module';

import { ClassRoomItemsModule } from '../classroomitems/classroomitems.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { UserCentesModule } from './../usercenter/usercenters.module';
import { UserLogsModule } from '../userlogs/userlogs.module';

@Module({
  imports: [
    UserCentesModule,
    CustomersModule,
    ClassRoomItemsModule,
    SubjectsModule,
    UserLogsModule,
  ],
  providers: [ClassRoomInjectsService, DateScalar, ClassRoomInjectsResolver],
  exports: [ClassRoomInjectsService],
})
export class ClassRoomInjectsModule {}
