import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    const ret: any = this.validateUser(user.id, user.login, user.code);
    return ret;
  }

  async validateUser(
    id: number,
    login: string,
    code: number,
  ): Promise<Boolean> {
    const user = await this.usersService.findOneById(id);
    if (user) {
      if (user.login === login && user.codeToken === code) {
        return true;
      }
    }
    throw new UnauthorizedException();
  }
}
