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
import { MulterModule } from '@nestjs/platform-express';
import { FileUploadModule } from './fileUpload/fileUpload.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://cadu:cadu3105@cluster0-vjqze.mongodb.net/test?retryWrites=true&w=majority',
    ),
    TypeOrmModule.forRoot(config),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    StudentsgqModule,
    UsersModule,
    TasksModule,
    AuthModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
