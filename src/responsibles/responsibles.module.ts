import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';

import { ResponsiblesResolver } from './resolvers/responsibles.resolver';
import { ResponsiblesService } from './responsibles.service';

import { StatesModule } from '../states/states.module';
import { CitiesModule } from '../cities/cities.module';
import { CustomersModule } from '../customers/customers.module';
import { UserCentesModule } from './../usercenter/usercenters.module';
import { UserLogsModule } from '../userlogs/userlogs.module';

@Module({
  imports: [
    UserCentesModule,
    CustomersModule,
    StatesModule,
    CitiesModule,
    UserLogsModule,
  ],
  providers: [ResponsiblesResolver, ResponsiblesService, DateScalar],
  exports: [ResponsiblesService],
})
export class ResponsiblesModule {}
