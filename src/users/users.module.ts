import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { UsersService } from './users.service';
import { UsersResolver } from './resolvers/users.resolvers';
import { UserCentesModule } from '../usercenter/usercenters.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [CustomersModule, UserCentesModule],
  providers: [UsersService, DateScalar, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
