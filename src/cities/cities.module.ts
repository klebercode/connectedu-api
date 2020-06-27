import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CitiesService } from './cities.service';
import { CitiesResolver } from './resolvers/cities.resolver';
import { CityEntity } from './entities/city.object';
import { AuthModule } from '../auth/auth.module';
import { StatesModule } from '../states/states.module';

@Module({
  imports: [StatesModule, AuthModule, TypeOrmModule.forFeature([CityEntity])],
  providers: [CitiesResolver, CitiesService, DateScalar],
  exports: [CitiesService],
})
export class CitiesModule {}
