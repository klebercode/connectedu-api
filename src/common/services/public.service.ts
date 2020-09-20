import {
  NotFoundException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository, Connection, EntitySchema } from 'typeorm';
import { PaginationArgs, paginate } from '../../common/pages';

export class ServicePublic<EntityPublic, CreatePublic, UpdatePublic> {
  repository: Repository<EntityPublic>;

  constructor(
    private readonly connectionPublic: Connection,
    private readonly entity: any,
    private readonly userLogs: any,
  ) {
    this.repository = connectionPublic.getRepository<EntityPublic>(entity);
  }

  async findAll(): Promise<EntityPublic[]> {
    return await this.repository.find({ where: { deleted: false } });
  }

  async findByIds(ids: number[]): Promise<EntityPublic[]> {
    return await this.repository.findByIds(ids, {
      where: { deleted: false },
    });
  }

  async findOneById(id: number): Promise<EntityPublic> {
    if (!id) {
      return null;
    }
    const obj = await this.repository.findOne(id, {
      where: { deleted: false },
    });
    if (!obj) {
      return null;
    }
    return obj;
  }

  async findOne(input: any): Promise<EntityPublic> {
    if (!input) {
      return null;
    }

    const obj = await this.repository.findOne(input);
    if (!obj) {
      return null;
    } else {
      if (obj['deleted']) {
        return null;
      }
    }
    return obj;
  }

  async findOneId(input: any): Promise<number> {
    if (!input) {
      return null;
    }

    const obj = await this.repository.findOne(input);
    if (!obj) {
      return null;
    } else {
      if (obj['deleted']) {
        return null;
      }
    }

    return obj['id'];
  }

  async create(
    input: CreatePublic,
    idUser: number,
    typeUser: string,
  ): Promise<EntityPublic> {
    const obj = await this.repository.save({ ...input });

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
    input: [CreatePublic],
    idUser: number,
    typeUser: string,
  ): Promise<EntityPublic[]> {
    const objects = [];

    input.forEach(item => {
      objects.push({
        ...item,
      });
    });

    const queryRunner = this.connectionPublic.createQueryRunner();
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

      throw new InternalServerErrorException(
        'Erro ao tentar criar novos registros !',
        error,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: number,
    input: UpdatePublic,
    idUser: number,
    typeUser: string,
  ): Promise<EntityPublic> {
    const obj = await this.findOneById(id);

    if (!obj) {
      throw new NotFoundException('Erro ao tentar atualizar registro !');
    } else {
      await this.repository.update(id, {
        ...input,
      });
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
    input: [UpdatePublic],
    idUser: number,
    typeUser: string,
  ): Promise<boolean> {
    const queryRunner = this.connectionPublic.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const promises = input.map(item => {
        return queryRunner.manager.update(
          this.entity,
          { id: item['id'], deleted: false },
          {
            ...item,
          },
        );
      });

      await Promise.all(promises);

      await queryRunner.commitTransaction();

      // resgistro de log da operação
      const ids = input.map(item => {
        return item['id'];
      });
      const objects = await this.findByIds(ids);

      const promisesLog = objects.map(item => {
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

      if (objects.length == 0) {
        return false;
      }

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(
        'Erro ao tentar atualizar os registros',
        error,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number, idUser: number, typeUser: string): Promise<Boolean> {
    const obj = await this.findOneById(id);
    if (obj) {
      obj['deleted'] = true;
      await this.repository.update(id, obj);

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
    const queryRunner = this.connectionPublic.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const objects = await this.findByIds(ids);

      const promises = objects.map(item => {
        item['deleted'] = true;
        return queryRunner.manager.update(this.entity, item['id'], {
          ...item,
        });
      });

      await Promise.all(promises);
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

      throw new InternalServerErrorException(
        'Erro ao tentar deletar os registros',
        error,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async getPageServ(paginationArgs: PaginationArgs): Promise<any> {
    const query = this.repository.createQueryBuilder().select();

    if (paginationArgs.filter) {
      query.where(paginationArgs.filter + ' and deleted=false');
    } else {
      query.where('deleted=false');
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
