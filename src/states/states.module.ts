import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StateService } from './states.service';
import { StatesResolver } from './resolvers/states.resolver';
import { StateEntity } from './entities/state.object';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forFeature([StateEntity])],
  providers: [StatesResolver, StateService, DateScalar],
  exports: [StateService],
})
export class StatesModule {}
