import {
  BadRequestException,
  MiddlewareConsumer,
  Module,
  Scope,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Customer } from '../customers/entities/customer.object';
import * as mongoose from 'mongoose';
import { UserLogSchema } from '../userlogs/entities/userlog.schema';

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
            connAtual = conn;
          }
        });
        return connAtual;
      },
    },
  ],
  exports: [CUSTOMER_CONNECTION_MONGO],
})
export class ConnectMongodbModule {
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
          // pegando as conecções e retornando a do host
          let connAtual: any;
          const connects = mongoose.connections;
          connects.map(conn => {
            if (conn.name == customer.domain) {
              connAtual = true;
            }
          });
          if (connAtual) {
            next();
          } else {
            throw new NotFoundException();
          }
        } catch (e) {
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

          const createdConnection = await mongoose.createConnection(url, opt);

          try {
            const model = await createdConnection
              .model('userlog', UserLogSchema)
              .createCollection();
          } catch (e) {
            console.log(e);
          }

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
