import {
  BadRequestException,
  MiddlewareConsumer,
  Module,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, createConnection, getConnection } from 'typeorm';

import { Customer } from './entities/customer.object';
import { CustomersService } from './customers.service';
import { CustomersResolver } from './resolvers/customers.resolver';

import { AuthModule } from '../auth/auth.module';

export const CUSTOMER_CONNECTION = 'CUSTOMER_CONNECTION';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [
    {
      provide: CUSTOMER_CONNECTION,
      inject: [REQUEST, Connection],
      scope: Scope.REQUEST,
      useFactory: async (request, connection) => {
        const customer: Customer = await connection
          .getRepository(Customer)
          .findOne({ where: { host: request.req.headers.host } });
        return getConnection(customer.domain);
      },
    },
    CustomersService,
    CustomersResolver,
  ],
  exports: [CUSTOMER_CONNECTION, CustomersService],
})
export class CustomersModule {
  constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(async (req: any, res: any, next: any) => {
        const customer: Customer = await this.connection
          .getRepository(Customer)
          .findOne({ where: { host: req.headers.host } });

        if (!customer) {
          throw new BadRequestException(
            '1 - Database Connection Error',
            'There is a Error with the Database!',
          );
        }

        try {
          getConnection(customer.domain);
          next();
        } catch (e) {
          const createdConnection: Connection = await createConnection({
            name: customer.domain,
            type: 'postgres',
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: parseInt(process.env.DB_PORT, 10) || 5433,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            schema: customer.domain,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
            // logging: true,
          });

          //console.log(__dirname + '/**/*.entity{.ts,.js}');

          if (createdConnection) {
            next();
          } else {
            throw new BadRequestException(
              '2 - Database Connection Error',
              'There is a Error with the Database!',
            );
          }
        }
      })
      .forRoutes('*');
  }
}
