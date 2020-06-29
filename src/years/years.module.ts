import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { YearsService } from './years.service';
import { YearsResolver } from './resolvers/years.resolvers';

import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [UsersModule, CustomersModule],
  providers: [YearsService, DateScalar, YearsResolver],
  exports: [],
})
export class YearsModule {}
