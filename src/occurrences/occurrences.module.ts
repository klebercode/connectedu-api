import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { OccurrencesService } from './occurrences.service';
import { OccurrencesResolver } from './resolvers/occurrences.resolvers';

import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [UsersModule, CustomersModule],
  providers: [OccurrencesService, DateScalar, OccurrencesResolver],
  exports: [OccurrencesService],
})
export class OccurrencesModule {}
