import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserCentersService } from '../../usercenter/usercenters.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly userCentersService: UserCentersService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    const ret: any = this.validateUser(user.id, user.type, user.token);
    return ret;
  }

  async validateUser(
    id: number,
    userType: string,
    token: string,
  ): Promise<Boolean> {
    const user = await this.userCentersService.findOne({
      idUser: id,
      userType: userType,
      token: token,
    });
    if (user) {
      return true;
    }

    throw new UnauthorizedException(
      'Usuário não localizado na Central de Usuários',
    );
  }
}
