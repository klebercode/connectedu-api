import { HttpException, NotFoundException } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { Inject } from '@nestjs/common';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { StudentsService } from '../students/students.service';
import { ResponsiblesService } from '../responsibles/responsibles.service';
import { StudentInformationsService } from '../studentinformations/studentinformations.service';

@CustomersServiceDecorator()
export class MigrationsService {
  constructor(
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
    private readonly studentsService: StudentsService,
    private readonly responsiblesService: ResponsiblesService,
    private readonly studentInformationsService: StudentInformationsService,
  ) {}
}

/*
  async create(
    input: CreateDefault,
    idUser: number,
    typeUser: string,
  ): Promise<EntityDefault> {
    const obj = await this.repository.save({
      ...input,
    });

    return obj;
  }
}
*/
