import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { UsersService } from './users.service';
import { UsersResolver } from './resolvers/users.resolvers';

import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [CustomersModule],
  providers: [UsersService, DateScalar, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
