import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { UserCentersService } from './usercenters.service';
import { userCentersResolver } from './resolvers/usercenters.resolvers';
import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [CustomersModule, UsersModule],
  providers: [UserCentersService, DateScalar, userCentersResolver],
  exports: [UserCentersService],
})
export class UserCentesModule {}
