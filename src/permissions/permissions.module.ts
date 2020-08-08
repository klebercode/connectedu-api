import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionsService } from './permissions.service';
import { PermissionsResolver } from './resolvers/permissions.resolver';
import { PermissionEntity } from './entities/permission.object';
import { AuthModule } from '../auth/auth.module';
import { CustomersModule } from '../customers/customers.module';
import { UserCentesModule } from './../usercenter/usercenters.module';

@Module({
  imports: [
    AuthModule,
    UserCentesModule,
    CustomersModule,
    TypeOrmModule.forFeature([PermissionEntity]),
  ],
  providers: [PermissionsResolver, PermissionsService, DateScalar],
  exports: [PermissionsService],
})
export class PermisisonsModule {}
