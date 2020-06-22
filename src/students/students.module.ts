import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { StudentsResolver } from './resolvers/students.resolver';
import { StudentsService } from './students.service';

import { UsersModule } from '../users/users.module';
import { StatesModule } from '../states/states.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [UsersModule, CustomersModule, StatesModule],
  providers: [StudentsResolver, StudentsService, DateScalar],
})
export class StudentsModule {}
