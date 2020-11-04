import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { YearsService } from './years.service';
import { YearsResolver } from './resolvers/years.resolvers';

import { CustomersModule } from '../customers/customers.module';
import { UserCentesModule } from './../usercenter/usercenters.module';
import { UserLogsModule } from '../userlogs/userlogs.module';

@Module({
  imports: [UserCentesModule, CustomersModule, UserLogsModule],
  providers: [YearsService, DateScalar, YearsResolver],
  exports: [YearsService],
})
export class YearsModule {}
