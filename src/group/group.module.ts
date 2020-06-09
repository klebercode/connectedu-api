import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupService } from './shared/group.service';
import { GroupResolver } from './resolvers/group.resolver';
import { Group } from './models/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: [GroupService, GroupResolver, DateScalar],
})
export class GroupModule {}
