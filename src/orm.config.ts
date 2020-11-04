import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  synchronize: true,
};

export const configMongo: TypeOrmModuleOptions = {
  type: 'mongodb',
  synchronize: true,
};
