import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { UserCentersService } from '../usercenter/usercenters.service';
import { KeyAccessService } from '../keyaccess/keyaccess.service';
import { UsersService } from '../users/users.service';
import { TypeUser } from '../common/enums/enum-typeuser';

@Injectable()
export class AuthService {
  constructor(
    private readonly userCentersService: UserCentersService,
    private readonly jwtService: JwtService,
    private readonly keyAccessService: KeyAccessService,
    private readonly usersService: UsersService,
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

  // Iniciar o projeto criando o superusuario
  async superUser(login: string, password: string): Promise<String> {
    if (login == process.env.NAME_ADMIN && password == process.env.PSW_ADMIN) {
      const userCenter = await this.userCentersService.getByEmailLogin(login);
      if (!userCenter) {
        const obj = {
          name: process.env.NAME_ADMIN,
          nickName: 'Admin',
          email: ' ',
          profile: ' ',
        };
        await this.usersService.create(obj, 1, 'I');

        const obj2 = {
          idUser: 1,
          userType: TypeUser.I,
          login: process.env.NAME_ADMIN,
          email: ' ',
          statusActiveWeb: true,
          password: (await bcryptjs.hash(process.env.PSW_ADMIN, 10)).toString(),
          token: process.env.TOKEN_ADMIN,
          statusActiveApp: true,
          status: true,
          keyAcessFirst: process.env.TOKEN_ADMIN,
        };
        const objRet = await this.userCentersService.create(obj2, 1, 'I');

        return this.getToken(objRet, '365d', '');
      } else {
        const userCenter = await this.userCentersService.getByEmailLogin(login);
        return this.getToken(userCenter, '365d', '');
      }
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
