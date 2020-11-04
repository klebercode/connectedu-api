import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { UserCentersService } from './usercenters.service';
import { userCentersResolver } from './resolvers/usercenters.resolvers';
import { CustomersModule } from '../customers/customers.module';
import { UserLogsModule } from '../userlogs/userlogs.module';

@Module({
  imports: [CustomersModule, UserLogsModule],
  providers: [UserCentersService, DateScalar, userCentersResolver],
  exports: [UserCentersService],
})
export class UserCentesModule {}
