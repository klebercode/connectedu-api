import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

export class ServicePublic<EntityPublic, CreatePublic, UpdatePublic> {
  repositoryPublic: Repository<EntityPublic>;
  constructor(repository: any) {
    this.repositoryPublic = repository;
  }

  async findAll(): Promise<EntityPublic[]> {
    return await this.repositoryPublic.find();
  }

  async findByIds(ids: number[]): Promise<EntityPublic[]> {
    return await this.repositoryPublic.findByIds(ids);
  }

  async findOneById(id: number): Promise<EntityPublic> {
    if (!id) {
      return null;
    }
    const obj = await this.repositoryPublic.findOne(id);
    if (!obj) {
      return null;
    }
    return obj;
  }

  async create(input: CreatePublic): Promise<EntityPublic> {
    const obj = await this.repositoryPublic.save(input);
    return obj;
  }

  async update(id: number, input: UpdatePublic): Promise<EntityPublic> {
    await this.repositoryPublic.update(id, {
      ...input,
    });
    const obj = await this.findOneById(id);
    if (!obj) {
      throw new NotFoundException();
    }
    return obj;
  }

  async remove(id: number): Promise<Boolean> {
    await this.repositoryPublic.delete(id);
    const obj = await this.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }
}
