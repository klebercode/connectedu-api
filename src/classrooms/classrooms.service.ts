import { Inject, GoneException } from '@nestjs/common';
import { CreateClassRoomInput } from './types/create-classroom.input';
import { ClassRoomEntity } from './entities/classroom.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersServiceDecorator()
export class ClassRoomsService {
  private classRoomRepository: Repository<ClassRoomEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.classRoomRepository = this.connection.getRepository(ClassRoomEntity);
  }

  async findAll(): Promise<ClassRoomEntity[]> {
    return await this.classRoomRepository.find();
  }

  async findOneById(id: number): Promise<ClassRoomEntity> {
    if (!id) {
      return null;
    }
    const user = await this.classRoomRepository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(
    classroom: CreateClassRoomInput,
    idUser: any,
  ): Promise<ClassRoomEntity> {
    const obj = await this.classRoomRepository.save({
      ...classroom,
      userCreatedId: idUser,
      userUpdatedId: idUser,
    });
    return obj;
  }

  async remove(id: number): Promise<boolean> {
    await this.classRoomRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async update(
    id: number,
    classroom: Partial<CreateClassRoomInput>,
    idUser: any,
  ): Promise<ClassRoomEntity> {
    await this.classRoomRepository.update(id, {
      ...classroom,
      userUpdatedId: idUser,
    });
    return this.findOneById(id);
  }
}
