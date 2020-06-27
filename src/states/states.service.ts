import { Injectable, GoneException } from '@nestjs/common';
import { CreateStateInput } from './types/create-state.input';
import { StateEntity } from './entities/state.object';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(StateEntity)
    private stateRepository: Repository<StateEntity>,
  ) {}

  async create(state: CreateStateInput): Promise<StateEntity> {
    try {
      const obj = await this.stateRepository.save(state);
      return obj;
    } catch (error) {
      throw new GoneException(error);
    }
  }

  async findOneById(id: number): Promise<StateEntity> {
    const obj = await this.stateRepository.findOne(id);
    if (!obj) {
      return null;
    }
    return obj;
  }

  async findAll(): Promise<StateEntity[]> {
    return await this.stateRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.stateRepository.delete(id);
  }

  async update(id: number, state: Partial<StateEntity>): Promise<StateEntity> {
    try {
      await this.stateRepository.update(id, state);
      return this.findOneById(id);
    } catch (error) {
      throw new GoneException(error);
    }
  }
}
