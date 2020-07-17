import { Inject, GoneException } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { CreateEmploeeInput } from './types/create-employee.input';
import { EmployeeEntity } from './entities/employee.entity';

@CustomersServiceDecorator()
export class EmployeesService {
  private employeeRepository: Repository<EmployeeEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.employeeRepository = this.connection.getRepository(EmployeeEntity);
  }

  async create(
    employee: CreateEmploeeInput,
    idUser: any,
  ): Promise<EmployeeEntity> {
    const obj = await this.employeeRepository.save({
      ...employee,
      userCreatedId: idUser,
      userUpdatedId: idUser,
    });
    return obj;
  }

  async findOneById(id: number): Promise<EmployeeEntity> {
    const obj = await this.employeeRepository.findOne(id);
    if (!obj) {
      return null;
    }
    return obj;
  }

  async findAll(): Promise<EmployeeEntity[]> {
    return await this.employeeRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }

  async update(
    id: number,
    employee: Partial<CreateEmploeeInput>,
    idUser: any,
  ): Promise<EmployeeEntity> {
    await this.employeeRepository.update(id, {
      ...employee,
      userUpdatedId: idUser,
    });
    return this.findOneById(id);
  }
}
