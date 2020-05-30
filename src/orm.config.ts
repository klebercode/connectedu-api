import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: 'docker',
  port: 5433,
  host: '127.0.0.1',
  database: 'pjnestjs',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  //entities: ['dist/**/*.entity{.ts,.js}'],
};
