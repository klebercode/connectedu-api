import { HttpException, NotFoundException } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { PaginationArgs, paginate } from '../../common/pages';

export class ServiceDefault<EntityDefault, CreateDefault, UpdateDefault> {
  repository: Repository<EntityDefault>;

  constructor(
    private readonly connection: Connection,
    private readonly entity: any,
    private readonly userLogs: any,
  ) {
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

  async create(
    input: CreateDefault,
    idUser: number,
    typeUser: string,
  ): Promise<EntityDefault> {
    const obj = await this.repository.save({
      ...input,
    });

    // resgistro de log da operação
    await this.saveLogs(
      this.entity.name,
      obj['id'],
      idUser,
      typeUser,
      'C',
      obj,
    );
    // fim de log

    return obj;
  }

  async createMany(
    input: [CreateDefault],
    idUser: number,
    typeUser: string,
  ): Promise<EntityDefault[]> {
    const objects = [];

    input.map(item => {
      objects.push({
        ...item,
      });
    });

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const objectsSave = await queryRunner.manager.save(this.entity, objects);
      await queryRunner.commitTransaction();

      // resgistro de log da operação
      const promisesLog = objectsSave.map(item => {
        return this.saveLogs(
          this.entity.name,
          item['id'],
          idUser,
          typeUser,
          'C',
          item,
        );
      });
      await Promise.all(promisesLog);
      // fim de log

      return objectsSave;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException('Erro ao tentar criar novos registros !', error);
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: number,
    input: UpdateDefault,
    idUser: number,
    typeUser: string,
  ): Promise<EntityDefault> {
    await this.repository.update(id, {
      ...input,
    });
    const obj = await this.findOneById(id);
    if (!obj) {
      throw new NotFoundException('Erro ao tentar atualizar registro');
    }

    // resgistro de log da operação
    await this.saveLogs(
      this.entity.name,
      obj['id'],
      idUser,
      typeUser,
      'U',
      obj,
    );
    // fim de log

    return obj;
  }

  async updateMany(
    input: [UpdateDefault],
    idUser: number,
    typeUser: string,
  ): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();
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

      // resgistro de log da operação
      const promisesLog = input.map(item => {
        return this.saveLogs(
          this.entity.name,
          item['id'],
          idUser,
          typeUser,
          'U',
          item,
        );
      });
      await Promise.all(promisesLog);
      // fim de log

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException('Erro ao tentar atualizar os registros', error);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number, idUser: number, typeUser: string): Promise<boolean> {
    const obj = await this.findOneById(id);
    if (obj) {
      await this.repository.delete(id);

      // resgistro de log da operação
      await this.saveLogs(
        this.entity.name,
        obj['id'],
        idUser,
        typeUser,
        'D',
        obj,
      );
      // fim de log
    }

    const objRet = await this.findOneById(id);
    if (!objRet) {
      return true;
    }
    return false;
  }

  async removeMany(
    ids: number[],
    idUser: number,
    typeUser: string,
  ): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const objects = await this.findByIds(ids);

      await queryRunner.manager.delete(this.entity, ids);

      await queryRunner.commitTransaction();

      // resgistro de log da operação
      const promisesLog = objects.map(item => {
        return this.saveLogs(
          this.entity.name,
          item['id'],
          idUser,
          typeUser,
          'D',
          item,
        );
      });
      await Promise.all(promisesLog);
      // fim de log

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new HttpException('Erro ao tentar deletar os registros', error);
    } finally {
      await queryRunner.release();
    }
  }

  async getPageServ(paginationArgs: PaginationArgs): Promise<any> {
    const query = this.repository.createQueryBuilder().select();

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

  async saveLogs(
    table: string,
    idRegister: number,
    idUser: number,
    typeUser: string,
    tipo: string,
    description: any,
  ) {
    let log = {
      table: table,
      idregister: idRegister,
      iduser: idUser,
      usertype: typeUser,
      operation: tipo,
      description: description,
    };
    return this.userLogs.create(log);
  }
}
