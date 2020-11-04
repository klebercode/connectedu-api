import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationsService } from './organizations.service';
import { OrganizationsResolver } from './resolvers/organizations.resolver';
import { OrganizationEntity } from './entities/organization.object';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';
import { UserCentesModule } from '../usercenter/usercenters.module';
import { KeyAccessModule } from '../keyaccess/keyaccess.module';
import { UserLogsModule } from '../userlogs/userlogs.module';

@Module({
  imports: [
    AuthModule,
    KeyAccessModule,
    UserCentesModule,
    CustomersModule,
    TypeOrmModule.forFeature([OrganizationEntity]),
    UserLogsModule,
  ],
  providers: [OrganizationsResolver, OrganizationsService, DateScalar],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
