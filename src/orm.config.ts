import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
     type: 'postgres',
     username: 'postgres',
     password: '110196' ,
     port: 5432,
     host: '127.0.0.1',
     database: 'dbgeral',
     synchronize: true,
     entities: [__dirname + '/**/*.entity{.ts,.js}'],
     //entities: ['dist/**/*.entity{.ts,.js}'],
};
