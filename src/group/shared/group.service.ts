import { Injectable } from '@nestjs/common';
import { NewGroup } from './../inputs/new-group.input';
import { Group } from './../models/group.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async create(group: NewGroup): Promise<Group> {
    const ret_group = await this.groupRepository.save(group);
    return ret_group;
  }

  async findOneById(id: number): Promise<Group> {
    return await this.groupRepository.findOne(id);
  }

  async findAll(): Promise<Group[]> {
    return await this.groupRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.groupRepository.delete(id);
  }

  async update(id: number, group: Partial<Group>) {
    await this.groupRepository.update(id, group);
    return this.findOneById(id);
  }
}
