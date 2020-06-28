import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { UserPermissionsService } from './userpermissions.service';
import { UserPermissionsResolver } from './resolvers/userpermissions.resolvers';
import { PermisisonsModule } from './../permissions/permissions.module';

import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [UsersModule, CustomersModule, PermisisonsModule],
  providers: [UserPermissionsService, DateScalar, UserPermissionsResolver],
  exports: [UserPermissionsService],
})
export class UserPermissionsModule {}
