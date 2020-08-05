import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionsService } from './permissions.service';
import { PermissionsResolver } from './resolvers/permissions.resolver';
import { PermissionEntity } from './entities/permission.object';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CustomersModule,
    TypeOrmModule.forFeature([PermissionEntity]),
  ],
  providers: [PermissionsResolver, PermissionsService, DateScalar],
  exports: [PermissionsService],
})
export class PermisisonsModule {}
