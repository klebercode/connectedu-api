import { Inject, GoneException } from '@nestjs/common';
import { CreateUserPermissionInput } from './types/create-userpermission.input';
import { UserPermissionEntity } from './entities/userpermission.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersServiceDecorator()
export class UserPermissionsService {
  private userPermissionsRepository: Repository<UserPermissionEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.userPermissionsRepository = this.connection.getRepository(
      UserPermissionEntity,
    );
  }

  async findAll(): Promise<UserPermissionEntity[]> {
    return await this.userPermissionsRepository.find();
  }

  async findOneById(id: number): Promise<UserPermissionEntity> {
    if (!id) {
      return null;
    }
    const user = await this.userPermissionsRepository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(
    userPermission: CreateUserPermissionInput,
    idUser: any,
  ): Promise<UserPermissionEntity> {
    try {
      const obj = await this.userPermissionsRepository.save({
        ...userPermission,
        userCreatedId: idUser,
      });
      return obj;
    } catch (error) {
      throw new GoneException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    await this.userPermissionsRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async update(
    id: number,
    userPermission: Partial<CreateUserPermissionInput>,
    idUser: any,
  ): Promise<UserPermissionEntity> {
    try {
      await this.userPermissionsRepository.update(id, {
        ...userPermission,
        userUpdatedId: idUser,
      });
      return this.findOneById(id);
    } catch (error) {
      throw new GoneException(error);
    }
  }
}
