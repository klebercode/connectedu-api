import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/shared/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async userLogin(userEmail: string, userPassword: string): Promise<String> {
    const user = await this.usersService.getByEmail(userEmail);
    if (user && user.password === userPassword) {
      return this.createToken(user);
    }

    throw new UnauthorizedException();
  }

  async createToken(user: User): Promise<String> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async validateUser(id: string, email: string): Promise<Boolean> {
    const user = await this.usersService.findOneById(parseInt(id));
    if (user) {
      if (user.email === email) {
        return true;
      }
    }

    throw new UnauthorizedException();
  }
}
