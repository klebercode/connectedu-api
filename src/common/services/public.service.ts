import { NotFoundException, HttpException } from '@nestjs/common';
import { Repository, Connection, EntitySchema } from 'typeorm';
import { PaginationArgs, paginate } from '../../common/pages';

export class ServicePublic<EntityPublic, CreatePublic, UpdatePublic> {
  repository: Repository<EntityPublic>;
  connectionPublic: Connection;
  entity: EntitySchema<EntityPublic>;

  constructor(connectionPublic: Connection, entity: any) {
    this.repository = connectionPublic.getRepository<EntityPublic>(entity);
    this.connectionPublic = connectionPublic;
    this.entity = entity;
  }

  async findAll(): Promise<EntityPublic[]> {
    return await this.repository.find();
  }

  async findByIds(ids: number[]): Promise<EntityPublic[]> {
    return await this.repository.findByIds(ids);
  }

  async findOneById(id: number): Promise<EntityPublic> {
    if (!id) {
      return null;
    }
    const obj = await this.repository.findOne(id);
    if (!obj) {
      return null;
    }
    return obj;
  }

  async create(input: CreatePublic): Promise<EntityPublic> {
    const obj = await this.repository.save({ ...input });
    return obj;
  }

  async createMany(input: [CreatePublic]): Promise<EntityPublic[]> {
    const objcts = [];

    input.forEach(item => {
      objcts.push({
        ...item,
      });
    });

    const queryRunner = this.connectionPublic.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const objs = await queryRunner.manager.save(this.entity, objcts);
      await queryRunner.commitTransaction();

      return objs;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(error, error);
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, input: UpdatePublic): Promise<EntityPublic> {
    await this.repository.update(id, {
      ...input,
    });
    const obj = await this.findOneById(id);
    if (!obj) {
      throw new NotFoundException();
    }
    return obj;
  }

  async updateMany(input: [UpdatePublic], idUser: any): Promise<boolean> {
    const queryRunner = this.connectionPublic.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const promises = input.map(item => {
        return queryRunner.manager.update(this.entity, item['id'], {
          ...item,
        });
      });

      await Promise.all(promises);

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(error, error);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<Boolean> {
    await this.repository.delete(id);
    const obj = await this.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }

  async removeMany(ids: number[]): Promise<boolean> {
    const queryRunner = this.connectionPublic.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(this.entity, ids);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException(error, error);
    } finally {
      await queryRunner.release();
    }
  }

  async getPageServ(paginationArgs: PaginationArgs): Promise<any> {
    const query = await this.repository.createQueryBuilder().select();

    if (paginationArgs.filter) {
      query.where(paginationArgs.filter);
    }
    if (paginationArgs.orderby && paginationArgs.orderby_desc) {
      query.orderBy({ [paginationArgs.orderby]: 'DESC' });
    } else if (paginationArgs.orderby) {
      query.orderBy({ [paginationArgs.orderby]: 'ASC' });
    } else if (paginationArgs.orderby_desc) {
      query.orderBy({ ['id']: 'DESC' });
    } else {
      query.orderBy({ ['id']: 'ASC' });
    }
    return paginate(query, paginationArgs);
  }
}
