import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async userLogin(userEmail: string, userPassword: string): Promise<String> {
    const user = await this.usersService.getByEmailLogin(userEmail);
    if (user) {
      if (await bcryptjs.compare(userPassword, user.password)) {
        return this.createToken(user);
      }
    }

    throw new UnauthorizedException();
  }

  async createToken(user: UserEntity): Promise<String> {
    const codeToken = Math.floor(Math.random() * 10000);
    const ret = await this.usersService.updateCodeToken(user.id, codeToken);
    if (ret) {
      const payload = { login: user.login, sub: user.id, code: codeToken };
      return this.jwtService.sign(payload);
    }
  }
}
