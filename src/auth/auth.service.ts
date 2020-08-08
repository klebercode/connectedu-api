import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { UserCentersService } from '../usercenter/usercenters.service';
import { KeyAccessService } from '../keyaccess/keyaccess.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userCentersService: UserCentersService,
    private readonly jwtService: JwtService,
    private readonly keyAccessService: KeyAccessService,
  ) {}

  async userLogin(login: string, password: string): Promise<String> {
    const userCenter = await this.userCentersService.getByEmailLogin(login);
    if (userCenter) {
      if (await bcryptjs.compare(password, userCenter.password)) {
        if (userCenter.status) {
          return this.getToken(userCenter, '1h', '');
        } else {
          throw new UnauthorizedException('Login está desativado !');
        }
      } else {
        throw new UnauthorizedException('Login ou Senha não conferem errado !');
      }
    } else {
      throw new UnauthorizedException('Login ou Senha não conferem errado !');
    }
  }

  async FirstAccess(key: string, originApp: boolean): Promise<string> {
    const customer = await this.keyAccessService.FindKeyAccess(key, originApp);

    const userCenter = await this.userCentersService.findOne({
      keyAcessFirst: key,
    });
    if (!userCenter) {
      throw new NotFoundException(
        'Usuário não localizado na Central de Usuários',
      );
    }

    if (originApp) {
      userCenter.statusActiveApp = true;
    } else {
      userCenter.statusActiveWeb = true;
    }
    userCenter.status = true;

    const userCenterSave = await this.userCentersService.update(
      userCenter.id,
      { ...userCenter },
      userCenter.idUser,
      userCenter.userType,
    );

    if (originApp) {
      return this.getToken(userCenterSave, '365d', customer['host']);
    } else {
      return this.getToken(userCenterSave, '1h', '');
    }
  }

  async getToken(
    user: any,
    expiresIn: string,
    address: string,
  ): Promise<string> {
    const payload = {
      sub: user.idUser,
      type: user.userType,
      token: user.token,
      address: address,
    };
    return this.jwtService.sign(payload, { expiresIn: expiresIn });
  }
}
