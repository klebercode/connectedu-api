import {
  HttpException,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
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
    const option = {
      where: { deleted: false },
    };

    try {
      return await this.repository.find(option);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar lista registros !',
        error,
      );
    }
  }

  async findByIds(ids: number[]): Promise<EntityDefault[]> {
    try {
      return await this.repository.findByIds(ids, {
        where: { deleted: false },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar listar registros especificos !',
        error,
      );
    }
  }

  async findOneById(id: number): Promise<EntityDefault> {
    if (!id) {
      return null;
    }
    let obj: any;

    try {
      obj = await this.repository.findOne(id, {
        where: { deleted: false },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar localizar registro !',
        error,
      );
    }

    if (!obj) {
      return null;
    }

    return obj;
  }

  async findOne(input: any): Promise<EntityDefault> {
    if (!input) {
      return null;
    }

    let obj: any;

    try {
      obj = await this.repository.findOne(input);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar localizar registro !',
        error,
      );
    }

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

    let obj: any;

    try {
      obj = await this.repository.findOne(input);
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar localizar registro !',
        error,
      );
    }

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
    input: CreateDefault,
    idUser: number,
    typeUser: string,
  ): Promise<EntityDefault> {
    let obj: any;

    try {
      obj = await this.repository.save({
        ...input,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar salvar novo registro !',
        error,
      );
    }

    try {
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
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar salvar registro de log para novo registro !',
        error,
      );
    }

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

    let queryRunner: any;
    let objectsSave: any;

    try {
      queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      objectsSave = await queryRunner.manager.save(this.entity, objects);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(
        'Erro ao tentar salvar novos registros !',
        error,
      );
    } finally {
      await queryRunner.release();
    }

    let promisesLog: any;
    try {
      // resgistro de log da operação
      promisesLog = objectsSave.map(item => {
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
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar savar log de novos registros !',
        error,
      );
    }

    return objectsSave;
  }

  async update(
    id: number,
    input: UpdateDefault,
    idUser: number,
    typeUser: string,
  ): Promise<EntityDefault> {
    const obj = await this.findOneById(id);

    if (!obj) {
      throw new NotFoundException('Registro não localizado !');
    }

    try {
      await this.repository.update(id, {
        ...input,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar salvar alteração !',
        error,
      );
    }

    try {
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
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar criar registro de log para alteração !',
        error,
      );
    }

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

  async remove(id: number, idUser: number, typeUser: string): Promise<boolean> {
    const obj = await this.findOneById(id);

    if (obj) {
      obj['deleted'] = true;

      try {
        await this.repository.update(id, obj);
      } catch (error) {
        throw new InternalServerErrorException(
          'Erro ao tentar deletar registro !',
          error,
        );
      }

      try {
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
      } catch (error) {
        throw new InternalServerErrorException(
          'Erro ao tentar criar registro de log para deleção !',
          error,
        );
      }
    } else {
      throw new NotFoundException('Registro não localizado para deleção !');
    }

    const objRet = await this.findOneById(id);

    if (!objRet) {
      return true;
    } else {
      throw new ConflictException('Não foi possível deletado registro !');
    }
  }

  async removeMany(
    ids: number[],
    idUser: number,
    typeUser: string,
  ): Promise<boolean> {
    const objects = await this.findByIds(ids);

    let queryRunner;

    try {
      queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const promises = objects.map(item => {
        item['deleted'] = true;
        return queryRunner.manager.update(this.entity, item['id'], {
          ...item,
        });
      });

      await Promise.all(promises);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(
        'Erro ao tentar deletar os registros',
        error,
      );
    } finally {
      await queryRunner.release();
    }

    try {
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
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao tentar criar registros de log para deleção !',
        error,
      );
    }

    return true;
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
