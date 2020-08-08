import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { SubjectsService } from './subjects.service';
import { SubjectsResolver } from './resolvers/subjects.resolvers';

import { UserCentesModule } from './../usercenter/usercenters.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [UserCentesModule, CustomersModule],
  providers: [SubjectsService, DateScalar, SubjectsResolver],
  exports: [SubjectsService],
})
export class SubjectsModule {}
