import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KeyAccessService } from './keyaccess.service';
import { KeyAccessResolver } from './resolvers/keyaccess.resolver';
import { KeyAccessEntity } from './entities/keyaccess.object';

import { CustomersModule } from '../customers/customers.module';
import { UserCentesModule } from '../usercenter/usercenters.module';
import { UserLogsModule } from '../userlogs/userlogs.module';

@Module({
  imports: [
    CustomersModule,
    UserCentesModule,
    TypeOrmModule.forFeature([KeyAccessEntity]),
    UserLogsModule,
  ],
  providers: [KeyAccessResolver, KeyAccessService, DateScalar],
  exports: [KeyAccessService],
})
export class KeyAccessModule {}
