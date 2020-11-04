import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CitiesService } from './cities.service';
import { CitiesResolver } from './resolvers/cities.resolver';
import { CityEntity } from './entities/city.object';

import { StatesModule } from '../states/states.module';
import { CustomersModule } from '../customers/customers.module';
import { UserCentesModule } from './../usercenter/usercenters.module';
import { UserLogsModule } from '../userlogs/userlogs.module';

@Module({
  imports: [
    StatesModule,
    UserCentesModule,
    TypeOrmModule.forFeature([CityEntity]),
    CustomersModule,
    UserLogsModule,
  ],
  providers: [CitiesResolver, CitiesService, DateScalar],
  exports: [CitiesService],
})
export class CitiesModule {}
