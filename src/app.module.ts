import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://geral:11019601@cluster0-kbti7.mongodb.net/test?retryWrites=true&w=majority'),
    UsersModule, 
    TasksModule,
    AuthModule,         
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
