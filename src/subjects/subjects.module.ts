import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { SubjectsService } from './subjects.service';
import { SubjectsResolver } from './resolvers/subjects.resolvers';

import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [UsersModule, CustomersModule],
  providers: [SubjectsService, DateScalar, SubjectsResolver],
  exports: [SubjectsService],
})
export class SubjectsModule {}
