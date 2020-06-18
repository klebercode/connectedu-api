import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { config } from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadModule } from './fileUpload/fileUpload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GroupsModule } from './groups/groups.module';
// Schema do postgres
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/customer.object';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...config,
        name: 'public',
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        port: configService.get<number>('DB_PORT'),
        host: configService.get<string>('DB_HOST'),
        database: configService.get<any>('DB_NAME'),
        entities: [Customer],
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    CustomersModule,
    StudentsModule,
    UsersModule,
    TasksModule,
    AuthModule,
    GroupsModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
