import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { UserTypessService } from './usertypes.service';
import { UserTypesResolver } from './resolvers/usertypes.resolvers';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [CustomersModule],
  providers: [UserTypessService, DateScalar, UserTypesResolver],
  exports: [UserTypessService],
})
export class UserTypesModule {}
