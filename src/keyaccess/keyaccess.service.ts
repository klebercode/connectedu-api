import {
  Injectable,
  Inject,
  NotFoundException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import * as crypto from 'crypto';

import { ServicePublic } from '../common/services/public.service';

import { KeyAccessEntity } from './entities/keyaccess.object';
import { CreateKeyAccessInput } from './types/create-keyaccess.input';
import { UpdateKeyAccessInput } from './types/update-keyaccess.input';
import { MyContext } from '../common/types/mycontext';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { CustomersService } from '../customers/customers.service';
import { UserCentersService } from '../usercenter/usercenters.service';
import { UserCenterEntity } from '../usercenter/entities/usercenter.entity';
import { modulo11 } from '../common/libs/libs';
import { UserLogsService } from '../userlogs/userlogs.service';

@Injectable()
export class KeyAccessService extends ServicePublic<
  KeyAccessEntity,
  CreateKeyAccessInput,
  UpdateKeyAccessInput
> {
  constructor(
    @InjectConnection() connectionPublic: Connection,
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
    private readonly customersService: CustomersService,
    private readonly userCentersService: UserCentersService,
    private readonly userLogsService: UserLogsService,
  ) {
    super(connectionPublic, KeyAccessEntity, userLogsService);
  }

  async createToken(
    context: MyContext,
    input: CreateKeyAccessInput,
  ): Promise<any> {
    const { typeUser } = input;
    const { ownerId } = input;

    const { user } = context.req;
    const { host } = context.req.headers;

    const customer = await this.customersService.findHost(host);

    if (!customer) {
      throw new NotFoundException();
    }

    //await this.findIdOwer(ownerId, typeUser);

    // gerar chave primeiro acesso
    const hexRandom = crypto
      .randomBytes(5)
      .toString('hex')
      .toUpperCase();

    const numRandom = parseInt(hexRandom, 16).toString();

    const digit = (await modulo11(numRandom, false)).toString();

    const keyAccess = hexRandom + digit;

    const objKeyAcess = new KeyAccessEntity();
    objKeyAcess.customerId = customer.id;
    objKeyAcess.organizationId = customer.organizationId;
    objKeyAcess.statusActiveApp = false;
    objKeyAcess.statusActiveWeb = false;
    objKeyAcess.typeUser = typeUser;
    objKeyAcess.keyAccess = keyAccess;

    const hexRandomApp = crypto
      .randomBytes(8)
      .toString('hex')
      .toUpperCase();

    const objUserCenter = new UserCenterEntity();
    objUserCenter.idUser = ownerId;
    objUserCenter.userType = typeUser;
    objUserCenter.statusActiveWeb = false;
    objUserCenter.statusActiveApp = false;
    objUserCenter.keyAcessFirst = keyAccess;
    objUserCenter.token = hexRandomApp;
    objUserCenter.status = false;

    try {
      const keyAccess = await this.repository.save(objKeyAcess);

      await this.userCentersService.createUserCenter(objUserCenter);

      return keyAccess;
    } catch (error) {
      throw new HttpException(error, error);
    }
  }

  /*
  async findIdOwer(id: number, typeUser: string): Promise<Boolean> {
    let ower: any;
    let msg: string;
    if (typeUser === TypeUser.S) {
      ower = await this.studentsService.findOneById(id);
      msg = 'Estudante Não Localizado';
    }
    if (typeUser === TypeUser.T) {
      ower = await this.teachersService.findOneById(id);
      msg = 'Professor Não Localizado';
    }
    if (typeUser === TypeUser.E) {
      ower = await this.employeesService.findOneById(id);
      msg = 'Funcionário Não Localizado';
    }
    if (typeUser === TypeUser.R) {
      ower = await this.responsiblesService.findOneById(id);
      msg = 'Responsável Não Localizado';
    }
    if (typeUser === TypeUser.I) {
      ower = await this.usersService.findOneById(id);
      msg = 'Usuário Interno Não Localizado';
    }
    if (!ower) {
      throw new NotFoundException(msg);
    }
    return true;
  }

  */

  // Metodo de primeiro acesso via Chave de Acesso
  async FindKeyAccess(key: string, originApp: boolean): Promise<any> {
    // pesquisa keyacess
    const keyAccess = await this.repository.findOne({ keyAccess: key });
    if (!keyAccess) {
      throw new NotFoundException('Chave de Acesso não localizada !');
    }

    if (originApp) {
      if (keyAccess.statusActiveApp == true) {
        throw new UnauthorizedException(
          'Chave de Acesso já utilizada em dipositivo movel (Celular ou Tablet)!',
        );
      }
    } else {
      if (keyAccess.statusActiveWeb == true) {
        throw new UnauthorizedException(
          'Chave de Acesso já utilizada para gerar login e senha no Portal Web!',
        );
      }
    }

    if (originApp) {
      keyAccess.statusActiveApp = true;
    } else {
      keyAccess.statusActiveWeb = true;
    }

    try {
      await this.repository.update(keyAccess.id, keyAccess);
    } catch (error) {
      throw new HttpException(
        'Erro ao atualizar registro de Chave de Acesso !',
        error,
      );
    }

    const customer = await this.customersService.findOneById(
      keyAccess.customerId,
    );

    if (!customer) {
      throw new NotFoundException('Endereço do Host Não Localizado !');
    }

    return customer;
  }
}
