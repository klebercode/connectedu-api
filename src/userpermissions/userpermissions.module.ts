import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { UserPermissionsService } from './userpermissions.service';
import { UserPermissionsResolver } from './resolvers/userpermissions.resolvers';
import { PermisisonsModule } from './../permissions/permissions.module';

import { CustomersModule } from '../customers/customers.module';
import { UserCentesModule } from './../usercenter/usercenters.module';

@Module({
  imports: [UserCentesModule, CustomersModule, PermisisonsModule],
  providers: [UserPermissionsService, DateScalar, UserPermissionsResolver],
  exports: [UserPermissionsService],
})
export class UserPermissionsModule {}
