import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { studentsResolver } from './resolvers/students.resolver';
import { StudentsService } from './students.service';

import { UsersModule } from '../users/users.module';
import { StatesModule } from '../states/states.module';
import { CitiesModule } from '../cities/cities.module';
import { CustomersModule } from '../customers/customers.module';
import { ResponsiblesModule } from '../responsibles/responsibles.module';

@Module({
  imports: [
    UsersModule,
    CustomersModule,
    StatesModule,
    CitiesModule,
    ResponsiblesModule,
  ],
  providers: [studentsResolver, StudentsService, DateScalar],
  exports: [StudentsService],
})
export class StudentsModule {}
