import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { ContentPlannedsService } from './contentplanneds.service';
import { ContentPlannedsResolver } from './resolvers/contentplanneds.resolvers';

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
  providers: [ContentPlannedsService, DateScalar, ContentPlannedsResolver],
  exports: [ContentPlannedsService],
})
export class ContentPlannedsModule {}
