import { Module } from '@nestjs/common';
import { StudentsgqModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { config } from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://geral:11019601@cluster0-kbti7.mongodb.net/test?retryWrites=true&w=majority',
    ),
    TypeOrmModule.forRoot(config),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    StudentsgqModule,
    UsersModule,
    TasksModule,
    AuthModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
