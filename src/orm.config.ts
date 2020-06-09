import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  //entities: ['dist/**/*.entity{.ts,.js}'],
};
