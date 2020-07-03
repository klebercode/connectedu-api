import { Inject, GoneException } from '@nestjs/common';
import { CreateClassRoomInjectInput } from './types/create-classroominject.input';
import { ClassRoomInjectEntity } from './entities/classroominject.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersServiceDecorator()
export class ClassRoomInjectsService {
  private classRoomInjectRepository: Repository<ClassRoomInjectEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.classRoomInjectRepository = this.connection.getRepository(
      ClassRoomInjectEntity,
    );
  }

  async findAll(): Promise<ClassRoomInjectEntity[]> {
    return await this.classRoomInjectRepository.find();
  }

  async findOneById(id: number): Promise<ClassRoomInjectEntity> {
    if (!id) {
      return null;
    }
    const user = await this.classRoomInjectRepository.findOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(
    classRoomInject: CreateClassRoomInjectInput,
    idUser: any,
  ): Promise<ClassRoomInjectEntity> {
    try {
      const obj = await this.classRoomInjectRepository.save({
        ...classRoomInject,
        userCreatedId: idUser,
      });
      return obj;
    } catch (error) {
      throw new GoneException(error);
    }
  }

  async remove(id: number): Promise<boolean> {
    await this.classRoomInjectRepository.delete(id);
    const user = await this.findOneById(id);
    if (!user) {
      return true;
    }
    return false;
  }

  async update(
    id: number,
    classRoomInject: Partial<CreateClassRoomInjectInput>,
    idUser: any,
  ): Promise<ClassRoomInjectEntity> {
    try {
      await this.classRoomInjectRepository.update(id, {
        ...classRoomInject,
        userUpdatedId: idUser,
      });
      return this.findOneById(id);
    } catch (error) {
      throw new GoneException(error);
    }
  }
}
