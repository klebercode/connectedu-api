import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../users/entities/user.entity';

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

  async createToken(user: UserEntity): Promise<String> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async validateUser(id: string, email: string): Promise<Boolean> {
    console.log(id);
    console.log(email);
    const user = await this.usersService.findOneById(parseInt(id));
    if (user) {
      if (user.email === email) {
        return true;
      }
    }

    throw new UnauthorizedException();
  }
}
