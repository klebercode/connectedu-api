import { Inject, NotFoundException } from '@nestjs/common';
import { CreateGroupInput } from './types/create-group.input';
import { GroupEntity } from './entities/group.entity';
import { Repository, Connection } from 'typeorm';
import { CustomersService } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

@CustomersService()
export class GroupsService {
  private groupsRepository: Repository<GroupEntity>;
  constructor(@Inject(CUSTOMER_CONNECTION) private connection: Connection) {
    this.groupsRepository = this.connection.getRepository(GroupEntity);
  }

  async create(group: CreateGroupInput): Promise<GroupEntity> {
    const groupCreated = await this.groupsRepository.save(group);
    return groupCreated;
  }

  async findOneById(id: number): Promise<GroupEntity> {
    const group = await this.groupsRepository.findOne(id);
    if (!group) {
      throw new NotFoundException(id);
    }
    return group;
  }

  async findAll(): Promise<GroupEntity[]> {
    return await this.groupsRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.groupsRepository.delete(id);
  }

  async update(id: number, group: Partial<GroupEntity>) {
    await this.groupsRepository.update(id, group);
    return this.findOneById(id);
  }
}
