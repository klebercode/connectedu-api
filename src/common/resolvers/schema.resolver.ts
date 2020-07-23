import { MyContext } from '../types/myContext';
import { NotFoundException } from '@nestjs/common';
import { CustomException } from '../filters/http-exception.filter';

export class ResolverDefault<EntityDefault, CreateDefault, UpdateDefault> {
  constructor(private nameApp: any, private services) {}

  async get(id: number): Promise<EntityDefault> {
    try {
      const obj = await this.services.findOneById(id);
      if (!obj) {
        throw new NotFoundException();
      }
      return obj;
    } catch (error) {
      CustomException.catch(error, 'get', this.nameApp);
    }
  }

  async getMany(ids: [Number]): Promise<EntityDefault[]> {
    try {
      return this.services.findByIds(ids);
    } catch (error) {
      CustomException.catch(error, 'getMany', this.nameApp);
    }
  }

  async getAll(): Promise<EntityDefault[]> {
    try {
      return this.services.findAll();
    } catch (error) {
      CustomException.catch(error, 'gets', this.nameApp);
    }
  }

  async create(
    context: MyContext,
    input: CreateDefault,
  ): Promise<EntityDefault> {
    try {
      const { user } = context.req;
      const obj = await this.services.create(input, user['id']);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'create', this.nameApp);
    }
  }

  async createMany(
    context: MyContext,
    input: [CreateDefault],
  ): Promise<EntityDefault[]> {
    try {
      const { user } = context.req;
      const obj = await this.services.createMany(input, user['id']);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'createMany', this.nameApp);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      return await this.services.remove(id);
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  async deleteMany(ids: [number]): Promise<boolean> {
    try {
      return await this.services.removeMany(ids);
    } catch (error) {
      CustomException.catch(error, 'deleteMany', this.nameApp);
    }
  }

  async update(
    context: MyContext,
    id: number,
    input: UpdateDefault,
  ): Promise<EntityDefault> {
    try {
      const { user } = context.req;
      const obj = await this.services.update(id, { ...input }, user['id']);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'update', this.nameApp);
    }
  }

  async updateMany(
    context: MyContext,
    input: [UpdateDefault],
  ): Promise<boolean> {
    try {
      const { user } = context.req;
      const obj = await this.services.updateMany(input, user['id']);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'updateMany', this.nameApp);
    }
  }
}
