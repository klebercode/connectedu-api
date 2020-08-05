import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import * as crypto from 'crypto';

import { ServicePublic } from '../common/services/public.service';

import { AcessTokenEntity } from './entities/acesstokens.object';
import { CreateAcessTokenInput } from './types/create-acesstoken.input';
import { UpdateAcessTokenInput } from './types/update-acesstoken.input';
import { MyContext } from '../common/types/myContext';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

// imports services
import { StudentsService } from '../students/students.service';
import { TeachersService } from '../teachers/teachers.service';
import { EmployeesService } from '../employees/employees.service';
import { ResponsiblesService } from '../responsibles/responsibles.service';
import { CustomersService } from '../customers/customers.service';
import { TypeUser } from '../common/enums/enum-usertoken';

@Injectable()
export class AcessTokensService extends ServicePublic<
  AcessTokenEntity,
  CreateAcessTokenInput,
  UpdateAcessTokenInput
> {
  constructor(
    @InjectConnection() connectionPublic: Connection,
    @Inject(CUSTOMER_CONNECTION) connection: Connection,

    private readonly studentsService: StudentsService,
    private readonly teachersService: TeachersService,
    private readonly employeesService: EmployeesService,
    private readonly responsiblesService: ResponsiblesService,
    private readonly customersService: CustomersService,
  ) {
    super(connectionPublic, AcessTokenEntity);
  }

  async createToken(
    context: MyContext,
    input: CreateAcessTokenInput,
  ): Promise<any> {
    const { typeUser } = input;
    const { ownerId } = input;

    const { user } = context.req;
    const { host } = context.req.headers;

    const customer = await this.customersService.findHost(host);

    if (!customer) {
      throw new NotFoundException();
    }

    const hexRandom = crypto
      .randomBytes(5)
      .toString('hex')
      .toUpperCase();

    const numRandom = parseInt(hexRandom, 16).toString();

    const digit = (await this.mod11(numRandom, false)).toString();

    const token = hexRandom + digit;

    const objNew = {
      organizationId: customer.organizationId,
      customerId: customer.id,
      statusAtivationApp: false,
      statusAtivationWeb: false,
      typeUser: typeUser,
      token: token,
    };

    const obj = await this.repository.save(objNew);

    if (typeUser === TypeUser.S) {
      const ower = await this.studentsService.updateToken(
        ownerId,
        token,
        user['id'],
      );
    }
    if (typeUser === TypeUser.T) {
      const ower = await this.teachersService.updateToken(
        ownerId,
        token,
        user['id'],
      );
    }
    if (typeUser === TypeUser.E) {
      const ower = await this.employeesService.updateToken(
        ownerId,
        token,
        user['id'],
      );
    }
    if (typeUser === TypeUser.R) {
      const ower = await this.responsiblesService.updateToken(
        ownerId,
        token,
        user['id'],
      );
    }
    return objNew;
  }

  async acessToken(token: string): Promise<any> {
    const obj = await this.repository.findOne({ token });
    let ower: any;

    if (!obj) {
      throw new NotFoundException();
    }

    const customer = await this.customersService.findOneById(obj.customerId);

    if (!obj) {
      throw new NotFoundException();
    }

    const param = { token: token };

    if (obj.typeUser === TypeUser.S) {
      ower = await this.studentsService.findOne(param);
    }
    if (obj.typeUser === TypeUser.T) {
      ower = await this.teachersService.findOne(param);
    }
    if (obj.typeUser === TypeUser.E) {
      ower = await this.employeesService.findOne(param);
    }
    if (obj.typeUser === TypeUser.R) {
      ower = await this.responsiblesService.findOne(param);
    }
    if (!ower) {
      throw new NotFoundException();
    }

    const retObj = {
      ownerId: ower.id,
      customer: customer.host,
      typeUser: obj.typeUser,
    };

    return retObj;
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
}
