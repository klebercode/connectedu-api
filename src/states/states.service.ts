import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStateInput } from './types/create-state.input';
import { StateEntity } from './entities/state.object';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private stateRepository: Repository<StateEntity>,
  ) {}

  async create(state: CreateStateInput): Promise<StateEntity> {
    const stateCreated = await this.stateRepository.save(state);
    return stateCreated;
  }

  async findOneById(id: number): Promise<StateEntity> {
    const state = await this.stateRepository.findOne(id);
    if (!state) {
      return null;
    }
    return state;
  }

  async findAll(): Promise<StateEntity[]> {
    return await this.stateRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.stateRepository.delete(id);
  }

  async update(id: number, group: Partial<StateEntity>) {
    await this.stateRepository.update(id, group);
    return this.findOneById(id);
  }
}
