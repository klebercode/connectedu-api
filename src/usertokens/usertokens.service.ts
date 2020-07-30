import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import * as crypto from 'crypto';

import { ServicePublic } from '../common/services/public.service';

import { UserTokenEntity } from './entities/usertokens.object';
import { CreateUserTokenInput } from './types/create-usertoken.input';
import { UpdateUserTokenInput } from './types/update-usertoken.input';
import { MyContext } from './../common/types/myContext';

// imports services
import { StudentsService } from './../students/students.service';
import { TeachersService } from './../teachers/teachers.service';
import { EmployeesService } from './../employees/employees.service';
import { ResponsiblesService } from './../responsibles/responsibles.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class UserTokensService extends ServicePublic<
  UserTokenEntity,
  CreateUserTokenInput,
  UpdateUserTokenInput
> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectRepository(UserTokenEntity)
    repository: Repository<UserTokenEntity>,
    private readonly studentsService: StudentsService,
    private readonly teachersService: TeachersService,
    private readonly employeesService: EmployeesService,
    private readonly responsiblesService: ResponsiblesService,
    private readonly customersService: CustomersService,
  ) {
    super(connection, repository, UserTokenEntity);
  }

  async createOwer(
    context: MyContext,
    input: CreateUserTokenInput,
  ): Promise<any> {
    const { typeOwer } = input;
    const { ownerId } = input;

    const { user } = context.req;
    const { host } = context.req.headers;

    const customer = await this.customersService.findHost(host);

    if (!customer) {
      throw new NotFoundException();
    }

    var token = crypto
      .randomBytes(5)
      .toString('hex')
      .toUpperCase();

    const objNew = {
      organizationId: customer.organizationId,
      customerId: customer.id,
      statusAtivation: false,
      typeUser: typeOwer,
      token: token,
    };

    const obj = await this.repository.save(objNew);

    if (typeOwer === 'S') {
      const ower = await this.studentsService.updateToken(
        ownerId,
        token,
        user['id'],
      );
    }
    if (typeOwer === 'T') {
      const ower = await this.teachersService.updateToken(
        ownerId,
        token,
        user['id'],
      );
    }
    if (typeOwer === 'E') {
      const ower = await this.employeesService.updateToken(
        ownerId,
        token,
        user['id'],
      );
    }
    if (typeOwer === 'R') {
      const ower = await this.responsiblesService.updateToken(
        ownerId,
        token,
        user['id'],
      );
    }
    return objNew;
  }
}
