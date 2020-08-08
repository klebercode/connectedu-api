import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConstants } from './constants';
import { LoginResolver } from './resolvers/auth.resolver';

import { KeyAccessModule } from '../keyaccess/keyaccess.module';
import { UserCentesModule } from '../usercenter/usercenters.module';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [AuthService, JwtStrategy, LoginResolver],
  imports: [
    KeyAccessModule,
    UserCentesModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      //signOptions: { expiresIn: '7d' },
    }),
  ],
})
export class AuthModule {}
