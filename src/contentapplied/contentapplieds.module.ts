import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { ContentAppliedsService } from './contentapplieds.service';
import { ContentAppliedsResolver } from './resolvers/contentapplieds.resolvers';

import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';

import { YearsModule } from '../years/years.module';
import { SubjectsModule } from '../subjects/subjects.module';
import { ClassRoomsModule } from '../classrooms/classrooms.module';
import { TeachersModule } from '../teachers/teachers.module';

@Module({
  imports: [
    UsersModule,
    CustomersModule,
    SubjectsModule,
    YearsModule,
    ClassRoomsModule,
    TeachersModule,
  ],
  providers: [ContentAppliedsService, DateScalar, ContentAppliedsResolver],
  exports: [ContentAppliedsService],
})
export class ContentAppliedsModule {}
