import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { MigrationsService } from './migrations.service';
//import { OccurrencesResolver } from './resolvers/occurrences.resolvers';

import { UserCentesModule } from './../usercenter/usercenters.module';
import { CustomersModule } from '../customers/customers.module';
import { UserLogsModule } from '../userlogs/userlogs.module';

@Module({
  imports: [UserCentesModule, CustomersModule, UserLogsModule],
  providers: [MigrationsService, DateScalar],
})
export class MigrationsModule {}
