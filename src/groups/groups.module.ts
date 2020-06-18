import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { GroupsService } from './groups.service';
import { GroupsResolver } from './resolvers/groups.resolver';

import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [CustomersModule],
  providers: [GroupsResolver, GroupsService, DateScalar],
})
export class GroupsModule {}
