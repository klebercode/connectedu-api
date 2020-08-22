import {
  BadRequestException,
  MiddlewareConsumer,
  Module,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getRepository, Connection } from 'typeorm';
import { Model, models, Schema } from 'mongoose';
import { Customer } from '../customers/entities/customer.object';
import * as mongoose from 'mongoose';
import { UserLog, UserLogSchema } from '../userlogs/entities/userlog.schema';

export const CUSTOMER_CONNECTION_MONGO = 'CUSTOMER_CONNECTION_MONGO';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [
    {
      provide: CUSTOMER_CONNECTION_MONGO,
      inject: [REQUEST, Connection],
      scope: Scope.REQUEST,
      useFactory: async (request, connection): Promise<typeof mongoose> => {
        const customer: Customer = await connection
          .getRepository(Customer)
          .findOne({ where: { host: request.req.headers.host } });

        // pegando as conecções e retornando a do host
        let connAtual: any;
        const connects = mongoose.connections;
        connects.map(conn => {
          if (conn.name == customer.domain) {
            console.log('pegou a conection mongo - ', customer.domain);
            connAtual = conn;
          }
        });
        return connAtual;
      },
    },
  ],
  exports: [CUSTOMER_CONNECTION_MONGO],
})
export class TenantsModule {
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
          const getconn = mongoose.connections;
          console.log('passeMG 1');
          if (getconn[1].name == customer.domain) {
            next();
          }
        } catch (e) {
          console.log('passeMG 2');

          const opt = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false, // Don't build indexes
            poolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            //family: 4, // Use IPv4, skip trying IPv6
          };

          const url =
            'mongodb://' +
            process.env.DB_USER_MG +
            ':' +
            process.env.DB_PASS_MG +
            '@' +
            process.env.DB_HOST_MG +
            ':' +
            parseInt(process.env.DB_PORT_MG, 10) +
            '/' +
            customer.domain;

          console.log('passeMG 2.1');

          const createdConnection = await mongoose.createConnection(url, opt);
          console.log('passeMG 2.2');

          console.log('passeMG 2.3');

          try {
            const model = await createdConnection
              .model(UserLog.name, UserLogSchema)
              .createCollection();
          } catch (e) {
            console.log(e);
          }

          console.log('passeMG 3');
          if (createdConnection) {
            console.log('passeMG 4');
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
