import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { studentsResolver } from './resolvers/students.resolver';
import { StudentsService } from './students.service';

import { StatesModule } from '../states/states.module';
import { CitiesModule } from '../cities/cities.module';
import { CustomersModule } from '../customers/customers.module';
import { ResponsiblesModule } from '../responsibles/responsibles.module';
import { UserCentesModule } from './../usercenter/usercenters.module';
import { UserLogsModule } from '../userlogs/userlogs.module';

@Module({
  imports: [
    UserCentesModule,
    CustomersModule,
    StatesModule,
    CitiesModule,
    ResponsiblesModule,
    UserLogsModule,
  ],
  providers: [studentsResolver, StudentsService, DateScalar],
  exports: [StudentsService],
})
export class StudentsModule {}
