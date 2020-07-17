import { Inject, GoneException } from '@nestjs/common';
import { CreateClassRoomItemInput } from './types/create-classroomitem.input';
import { ClassRoomItemEntity } from './entities/classroomitem.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersServiceDecorator()
export class ClassRoomItemsService {
  private classRoomItemRepository: Repository<ClassRoomItemEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.classRoomItemRepository = this.connection.getRepository(
      ClassRoomItemEntity,
    );
  }

  async findAll(): Promise<ClassRoomItemEntity[]> {
    return await this.classRoomItemRepository.find();
  }

  async findOneById(id: number): Promise<ClassRoomItemEntity> {
    if (!id) {
      return null;
    }
    const user = await this.classRoomItemRepository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(
    classRoomItem: CreateClassRoomItemInput,
    idUser: any,
  ): Promise<ClassRoomItemEntity> {
    const obj = await this.classRoomItemRepository.save({
      ...classRoomItem,
      userCreatedId: idUser,
      userUpdatedId: idUser,
    });
    return obj;
  }

  async remove(id: number): Promise<boolean> {
    await this.classRoomItemRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async update(
    id: number,
    classRoomItem: Partial<CreateClassRoomItemInput>,
    idUser: any,
  ): Promise<ClassRoomItemEntity> {
    await this.classRoomItemRepository.update(id, {
      ...classRoomItem,
      userUpdatedId: idUser,
    });
    return this.findOneById(id);
  }
}
