import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { config } from './orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { FileUploadModule } from './fileUpload/fileUpload.module';
import { StatesModule } from './states/states.module';
import { StateEntity } from './states/entities/state.object';
import { GroupsModule } from './groups/groups.module';
import { StudentsModule } from './students/students.module';

// Schema do postgres
import { CustomersModule } from './customers/customers.module';
import { Customer } from './customers/customer.object';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
        entities: [Customer, StateEntity],
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    AuthModule,
    StatesModule,
    CustomersModule,
    UsersModule,
    StudentsModule,
    GroupsModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
