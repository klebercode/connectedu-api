import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { UserCentersService } from './usercenters.service';
import { userCentersResolver } from './resolvers/usercenters.resolvers';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [CustomersModule],
  providers: [UserCentersService, DateScalar, userCentersResolver],
  exports: [UserCentersService],
})
export class UserCentesModule {}
