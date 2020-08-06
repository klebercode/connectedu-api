import { HttpException, NotFoundException, All } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { PaginationArgs, paginate } from '../../common/pages';

export class ServiceDefault<EntityDefault, CreateDefault, UpdateDefault> {
  repository: Repository<EntityDefault>;

  constructor(private connection: Connection, private entity: any) {
    this.repository = connection.getRepository<EntityDefault>(entity);
  }

  async findAll(): Promise<EntityDefault[]> {
    return await this.repository.find();
  }

  async findByIds(ids: number[]): Promise<EntityDefault[]> {
    return await this.repository.findByIds(ids);
  }

  async findOneById(id: number): Promise<EntityDefault> {
    if (!id) {
      return null;
    }
    const obj = await this.repository.findOne(id);
    if (!obj) {
      return null;
    }
    return obj;
  }

  async findOne(input: any): Promise<EntityDefault> {
    if (!input) {
      return null;
    }

    const obj = await this.repository.findOne(input);
    if (!obj) {
      return null;
    }
    return obj;
  }

  async create(input: CreateDefault, idUser: any): Promise<EntityDefault> {
    const obj = await this.repository.save({
      ...input,
      userCreatedId: idUser,
      userUpdatedId: idUser,
    });
    return obj;
  }

  async createMany(
    input: [CreateDefault],
    idUser: any,
  ): Promise<EntityDefault[]> {
    const objcts = [];

    input.forEach(item => {
      objcts.push({
        ...item,
        userCreatedId: idUser,
        userUpdatedId: idUser,
      });
    });

    const queryRunner = this.connection.createQueryRunner();
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

  async update(
    id: number,
    input: UpdateDefault,
    idUser: number,
  ): Promise<EntityDefault> {
    await this.repository.update(id, {
      ...input,
      userUpdatedId: idUser,
    });
    const obj = await this.findOneById(id);
    if (!obj) {
      throw new NotFoundException();
    }
    return obj;
  }

  async updateMany(input: [UpdateDefault], idUser: any): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const promises = input.map(item => {
        return queryRunner.manager.update(this.entity, item['id'], {
          ...item,
          userUpdatedId: idUser,
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

  async remove(id: number): Promise<boolean> {
    await this.repository.delete(id);
    const obj = await this.findOneById(id);
    if (!obj) {
      return true;
    }
    return false;
  }

  async removeMany(ids: number[]): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();
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
