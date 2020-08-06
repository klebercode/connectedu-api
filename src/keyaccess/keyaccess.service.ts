import {
  Injectable,
  Inject,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import * as crypto from 'crypto';

import { ServicePublic } from '../common/services/public.service';

import { KeyAccessEntity } from './entities/keyaccess.object';
import { CreateKeyAccessInput } from './types/create-keyaccess.input';
import { UpdateKeyAccessInput } from './types/update-keyaccess.input';
import { MyContext } from '../common/types/myContext';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

// imports services
import { StudentsService } from '../students/students.service';
import { TeachersService } from '../teachers/teachers.service';
import { EmployeesService } from '../employees/employees.service';
import { ResponsiblesService } from '../responsibles/responsibles.service';
import { CustomersService } from '../customers/customers.service';
import { TypeUser } from '../common/enums/enum-usertoken';
import { UserCentersService } from '../usercenter/usercenters.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class KeyAccessService extends ServicePublic<
  KeyAccessEntity,
  CreateKeyAccessInput,
  UpdateKeyAccessInput
> {
  constructor(
    @InjectConnection() connectionPublic: Connection,
    @Inject(CUSTOMER_CONNECTION) connection: Connection,

    private readonly studentsService: StudentsService,
    private readonly teachersService: TeachersService,
    private readonly employeesService: EmployeesService,
    private readonly responsiblesService: ResponsiblesService,
    private readonly customersService: CustomersService,
    private readonly userCentersService: UserCentersService,
    private readonly usersService: UsersService,
  ) {
    super(connectionPublic, KeyAccessEntity);
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

    await this.findIdOwer(ownerId, typeUser);

    // gerar chave primeiro acesso
    const hexRandom = crypto
      .randomBytes(5)
      .toString('hex')
      .toUpperCase();

    const numRandom = parseInt(hexRandom, 16).toString();

    const digit = (await this.mod11(numRandom, false)).toString();

    const keyAcess = hexRandom + digit;

    const objKeyAcess = {
      organizationId: customer.organizationId,
      customerId: customer.id,
      statusActiveApp: false,
      statusActiveWeb: false,
      typeUser: typeUser,
      keyAcess: keyAcess,
    };

    const hexRandomApp = crypto
      .randomBytes(8)
      .toString('hex')
      .toUpperCase();

    const objUserCenter = {
      idUser: ownerId,
      userType: typeUser,
      statusActiveWeb: false,
      statusActiveApp: false,
      keyAcessFirst: keyAcess,
      tokenApp: hexRandomApp,
      userCreatedId: user['id'],
      userUpdatedId: user['id'],
    };

    try {
      const keyAccess = await this.repository.save(objKeyAcess);

      await this.userCentersService.createUserCenter(objUserCenter);

      return keyAccess;
    } catch (error) {
      throw new HttpException(error, error);
    }
  }

  async findIdOwer(id: number, typeUser: string): Promise<Boolean> {
    let ower;
    let msg;
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

  async mod11(valor, retornarResto) {
    if (typeof retornarResto === 'undefined') retornarResto = false;
    const multiplicadores = [2, 3, 4, 5, 6, 7, 8, 9];

    var i = 0;
    var resto =
      valor.split('').reduceRight(function(anterior, atual) {
        if (i > multiplicadores.length - 1) i = 0;
        return multiplicadores[i++] * parseInt(atual, 10) + anterior;
      }, 0) % 11;

    return retornarResto ? resto : 11 - resto >= 10 ? 0 : 11 - resto;
  }

  async FindKeyAccess(key: string): Promise<any> {
    const obj = await this.repository.findOne({ keyAccess: key });
    let ower: any;

    if (!obj) {
      throw new NotFoundException('Chave de Acesso Não Localizada !');
    }

    const customer = await this.customersService.findOneById(obj.customerId);

    if (!customer) {
      throw new NotFoundException('Customer Não Localizado');
    }

    return customer;
  }
}
