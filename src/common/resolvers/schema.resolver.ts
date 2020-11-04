import { NotFoundException } from '@nestjs/common';
import { CustomException } from '../filters/http-exception.filter';
import { PaginationArgs } from '../../common/pages';
import { MyContext } from '../types/mycontext';

export class ResolverDefault<EntityDefault, CreateDefault, UpdateDefault> {
  constructor(private nameApp: any, private services: any) {}

  // metodos de queries
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

  async getPagenated(pagination: PaginationArgs): Promise<any> {
    try {
      const obj = await this.services.getPageServ(pagination);
      return obj;
    } catch (error) {
      CustomException.catch(error, 'getPage', this.nameApp);
    }
  }

  // metodos de mutations
  async create(
    context: MyContext,
    input: CreateDefault,
  ): Promise<EntityDefault> {
    try {
      const { user } = context.req;
      const obj = await this.services.create(input, user['id'], user['type']);
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
      const obj = await this.services.createMany(
        input,
        user['id'],
        user['type'],
      );
      return obj;
    } catch (error) {
      CustomException.catch(error, 'createMany', this.nameApp);
    }
  }

  async delete(context: MyContext, id: number): Promise<boolean> {
    try {
      const { user } = context.req;

      return await this.services.remove(id, user['id'], user['type']);
    } catch (error) {
      CustomException.catch(error, 'delete', this.nameApp);
    }
  }

  async deleteMany(context: MyContext, ids: [number]): Promise<boolean> {
    try {
      const { user } = context.req;

      return await this.services.removeMany(ids, user['id'], user['type']);
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
      const obj = await this.services.update(
        id,
        { ...input },
        user['id'],
        user['type'],
      );
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
      const obj = await this.services.updateMany(
        input,
        user['id'],
        user['type'],
      );
      return obj;
    } catch (error) {
      CustomException.catch(error, 'updateMany', this.nameApp);
    }
  }
}
