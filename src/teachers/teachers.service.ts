import { Inject } from '@nestjs/common';
import { Connection } from 'typeorm';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';
import { ServiceDefault } from '../common/services/schema.service';

import { TeacherEntity } from './entities/teacher.entity';
import { CreateTeacherInput } from './types/create-teacher.input';
import { UpdateTeacherInput } from './types/update-teacher.input';

@CustomersServiceDecorator()
export class TeachersService extends ServiceDefault<
  TeacherEntity,
  CreateTeacherInput,
  UpdateTeacherInput
> {
  constructor(@Inject(CUSTOMER_CONNECTION) connection: Connection) {
    super(connection, TeacherEntity);
  }

  async updateToken(
    id: number,
    token: string,
    idUser: number,
  ): Promise<Boolean> {
    await this.repository.update(id, {
      token: token,
      userUpdatedId: idUser,
    });
    return true;
  }
}
