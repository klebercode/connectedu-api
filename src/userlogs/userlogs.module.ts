import { Module } from '@nestjs/common';
import { UserLogsService } from './userlogs.service';
import { ConnectMongodbModule } from '../connectmongodb/connectmongodb.module';

@Module({
  imports: [ConnectMongodbModule],
  providers: [UserLogsService],
  exports: [UserLogsService],
})
export class UserLogsModule {}
