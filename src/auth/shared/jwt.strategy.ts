import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { AuthService } from './auth.service';

console.log('chegou no arquivo');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
    console.log('constructor');
  }

  async validate(payload: any) {
    console.log('aqui');
    if (await this.authService.validateUser(payload.sub, payload.email)) {
      return { id: payload.sub, email: payload.email };
    }
  }
}
