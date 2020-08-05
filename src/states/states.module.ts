import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatesService } from './states.service';
import { StatesResolver } from './resolvers/states.resolver';
import { StateEntity } from './entities/state.object';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CustomersModule,
    TypeOrmModule.forFeature([StateEntity]),
  ],
  providers: [StatesResolver, StatesService, DateScalar],
  exports: [StatesService],
})
export class StatesModule {}
