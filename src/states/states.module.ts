import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatesService } from './states.service';
import { StatesResolver } from './resolvers/states.resolver';
import { StateEntity } from './entities/state.object';
import { AuthModule } from '../auth/auth.module';
import { CustomersModule } from '../customers/customers.module';
import { UserCentesModule } from './../usercenter/usercenters.module';

@Module({
  imports: [
    UserCentesModule,
    CustomersModule,
    TypeOrmModule.forFeature([StateEntity]),
  ],
  providers: [StatesResolver, StatesService, DateScalar],
  exports: [StatesService],
})
export class StatesModule {}
