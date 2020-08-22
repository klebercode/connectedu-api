import { Module } from '@nestjs/common';
import { UserLogsService } from './userlogs.service';
import {
  TenantsModule,
  CUSTOMER_CONNECTION_MONGO,
} from '../tenants/tenants.module';

@Module({
  imports: [TenantsModule],
  providers: [UserLogsService],
  exports: [UserLogsService],
})
export class UserLogsModule {}
