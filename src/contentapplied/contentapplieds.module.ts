import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { ContentAppliedsService } from './contentapplieds.service';
import { ContentAppliedsResolver } from './resolvers/contentapplieds.resolvers';

import { UserCentesModule } from './../usercenter/usercenters.module';
import { CustomersModule } from '../customers/customers.module';

import { YearsModule } from '../years/years.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { ClassRoomsModule } from '../classrooms/classrooms.module';
import { TeachersModule } from '../teachers/teachers.module';
import { UserLogsModule } from '../userlogs/userlogs.module';

@Module({
  imports: [
    UserCentesModule,
    CustomersModule,
    SubjectsModule,
    YearsModule,
    ClassRoomsModule,
    TeachersModule,
    UserLogsModule,
  ],
  providers: [ContentAppliedsService, DateScalar, ContentAppliedsResolver],
  exports: [ContentAppliedsService],
})
export class ContentAppliedsModule {}
