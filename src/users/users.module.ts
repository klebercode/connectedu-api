import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserResolver } from './resolvers/user.resolvers';
import { UsersService } from './shared/users.service';
import { User } from './models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, DateScalar, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
