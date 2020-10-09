import { Test, TestingModule } from '@nestjs/testing';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { YearsService } from './years.service';
import { CreateYearInput } from './types/create-year.input';

import { UserLogsService } from '../userlogs/userlogs.service';
import { CreateUserLogDTO } from '../userlogs/types/create.userlog.dto';
import { TestUtil } from '../common/test/test.util';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

describe('YearsService', () => {
  let service: YearsService;

  const mockRepository = {
    getRepository: jest.fn(),
    createQueryRunner: jest.fn(),
  };

  const userLogs = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        YearsService,
        {
          provide: CUSTOMER_CONNECTION,
          useValue: mockRepository,
        },
        {
          provide: UserLogsService,
          useValue: userLogs,
        },
      ],
    }).compile();

    service = await module.resolve<YearsService>(YearsService);
  });

  afterEach(async () => {
    mockRepository.getRepository.mockReset();
    mockRepository.createQueryRunner.mockReset();
    userLogs.create.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          find: jest.fn().mockReturnValue([year, year]),
        };
      });
    });

    it('should return list all Years', async () => {
      const objs = await service.findAll();

      expect(objs).toHaveLength(2);
      expect(objs).toStrictEqual([year, year]);
    });
  });

  describe('findAll -> Error 500', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          find: jest.fn().mockRejectedValue(new Error()),
        };
      });
    });

    it('should return error exception to list object', async () => {
      try {
        const obj = await service.findAll();
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual('Erro ao tentar lista registros !');
      }
    });
  });

  describe('findAll -> Null', () => {
    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          find: jest.fn().mockReturnValue(null),
        };
      });
    });

    it('should return null to findAll', async () => {
      const objs = await service.findAll();

      expect(objs).toBeNull();
    });
  });

  describe('findByIds', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findByIds: jest.fn().mockReturnValue([year, year, year]),
        };
      });
    });

    it('should return array of Years specifics', async () => {
      const objs = await service.findByIds([1, 2, 3]);

      expect(objs).toHaveLength(3);
      expect(objs).toStrictEqual([year, year, year]);
    });
  });

  describe('findByIds -> Null', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findByIds: jest.fn().mockReturnValue(null),
        };
      });
    });

    it('should return null of years specifics', async () => {
      const objs = await service.findByIds([1, 2, 3]);

      expect(objs).toBeNull();
    });
  });

  describe('findByIds -> Error 500', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findByIds: jest.fn().mockRejectedValue(new Error()),
        };
      });
    });

    it('should return error exception to years specifics', async () => {
      try {
        const objs = await service.findByIds([1, 2, 3]);
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar listar registros especificos !',
        );
      }
    });
  });

  describe('findOneById', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(year),
        };
      });
    });

    it('should return one specific Id', async () => {
      const objs = await service.findOneById(1);

      expect(objs.year).toEqual(year.year);
      expect(objs).toStrictEqual(year);
    });
  });

  describe('findOneById -> Null', () => {
    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
        };
      });
    });

    it('should return null to specific Id', async () => {
      const objs = await service.findOneById(1);

      expect(objs).toBeNull();
    });
  });

  describe('findOneById Id Null-> Null', () => {
    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
        };
      });
    });

    it('should return null to Id null', async () => {
      const objs = await service.findOneById(null);

      expect(objs).toBeNull();
    });
  });

  describe('findOneById -> Error 500', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockRejectedValue(new Error()),
        };
      });
    });

    it('should return error exception to year specific', async () => {
      try {
        const objs = await service.findOneById(1);
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual('Erro ao tentar localizar registro !');
      }
    });
  });

  describe('findOne', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(year),
        };
      });
    });

    it('should return one specific YearEntity for input specific', async () => {
      const objs = await service.findOne({
        where: [{ year: year.year }],
      });

      expect(objs.year).toEqual(year.year);
      expect(objs).toStrictEqual(year);
    });
  });

  describe('findOne -> Null', () => {
    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
        };
      });
    });

    it('should return one specific Year for input null', async () => {
      const objs = await service.findOne(null);

      expect(objs).toBeNull();
    });
  });

  describe('findOne -> Error 500', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockRejectedValue(new Error()),
        };
      });
    });

    it('should return error exception to year specific', async () => {
      try {
        const objs = await service.findOne({
          where: [{ year: year.year }],
        });
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual('Erro ao tentar localizar registro !');
      }
    });
  });

  describe('findOne Year Specific -> Null', () => {
    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
        };
      });
    });

    it('should return null to specific Year not found ', async () => {
      const objs = await service.findOne({
        where: [{ year: '2032' }],
      });

      expect(objs).toBeNull();
    });
  });

  describe('findOne -> Deleted', () => {
    const year = TestUtil.giveMeAvalidYear();
    year.deleted = true;

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(year),
        };
      });
    });

    it('should return null to Year deleted', async () => {
      const objs = await service.findOne({
        where: [{ year: year.year }],
      });

      expect(objs).toBeNull();
    });
  });

  describe('findOneId', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(year),
        };
      });
    });

    it('should return one Id for input specific', async () => {
      const id = await service.findOneId({
        where: [{ year: year.year }],
      });

      expect(id).toEqual(1);
    });
  });

  describe('findOneId -> Null', () => {
    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
        };
      });
    });

    it('should return null for input null', async () => {
      const objs = await service.findOneId(null);

      expect(objs).toBeNull();
    });
  });

  describe('findOneId Year Specific -> Null', () => {
    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
        };
      });
    });

    it('should return null to year specific not found', async () => {
      const objs = await service.findOneId({
        where: [{ year: '2032' }],
      });

      expect(objs).toBeNull();
    });
  });

  describe('findOneId -> Deleted', () => {
    const year = TestUtil.giveMeAvalidYear();
    year.deleted = true;

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(year),
        };
      });
    });

    it('should return null to object deleted', async () => {
      const objs = await service.findOneId({
        where: [{ year: year.year }],
      });

      expect(objs).toBeNull();
    });
  });

  describe('findOneId -> Error 500', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockRejectedValue(new Error()),
        };
      });
    });

    it('should return error exception to year specific', async () => {
      try {
        const objs = await service.findOneId({
          where: [{ year: year.year }],
        });
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual('Erro ao tentar localizar registro !');
      }
    });
  });

  describe('create ', () => {
    const year = TestUtil.giveMeAvalidYear();
    const newobj = TestUtil.giveMeAvalidYearNew();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
          save: jest.fn().mockReturnValue(newobj),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return one new object', async () => {
      const obj = await service.create(newobj, 1, 'I');

      expect(obj).toStrictEqual(newobj);
    });
  });

  describe('create -> Error 500', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
          save: jest.fn().mockRejectedValue(new Error()),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return error exception to new object', async () => {
      try {
        const obj = await service.create(year, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar salvar novo registro !',
        );
      }
    });
  });

  describe('create -> Error 500 mongo', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
          save: jest.fn().mockReturnValue(year),
        };
      });
      userLogs.create = jest.fn().mockRejectedValue(new Error());
    });

    it('should return error exception to registro de log - create', async () => {
      let obj;
      try {
        obj = await service.create(year, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar salvar registro de log para novo registro !',
        );
      }
    });
  });

  describe('create -> Error 409 Conflict Year', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(year),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return error 409 to new object', async () => {
      try {
        const obj = await service.create(year, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(409);
        expect(error['message']).toEqual(
          'Registro com o mesmo Ano já existente !',
        );
      }
    });
  });

  describe('update', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(year),
          update: jest.fn().mockReturnValue(year),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return object updated', async () => {
      const obj = await service.update(1, year, 1, 'I');

      expect(obj).toStrictEqual(year);
    });
  });

  describe('update -> Error 500', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(year),
          update: jest.fn().mockRejectedValue(new Error()),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return a exception to update', async () => {
      let obj: any;
      try {
        obj = await service.update(1, year, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual('Erro ao tentar salvar alteração !');
      }
    });
  });

  describe('update -> Error 500 mongo', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(year),
          update: jest.fn().mockReturnValue(year),
        };
      });
      userLogs.create = jest.fn().mockRejectedValue(new Error());
    });

    it('should return a exception error mongodb', async () => {
      let obj;
      try {
        obj = await service.update(1, year, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar criar registro de log para alteração !',
        );
      }
    });
  });

  describe('update -> Error 409 Conflict Year', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(year),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return error 409 to update object', async () => {
      try {
        const obj = await service.update(2, year, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(409);
        expect(error['message']).toEqual(
          'Registro com o mesmo Ano já existente !',
        );
      }
    });
  });

  describe('update -> Error 404 not found', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return error 404 to update object', async () => {
      try {
        const obj = await service.update(5, year, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(404);
        expect(error['message']).toEqual('Registro não localizado !');
      }
    });
  });

  describe('remove', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest
            .fn()
            .mockReturnValueOnce(year)
            .mockReturnValue(null),
          update: jest.fn().mockReturnValue(year),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return true to remove', async () => {
      const obj = await service.remove(1, 1, 'I');

      expect(obj).toBe(true);
    });
  });

  describe('remove -> Error 500', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest
            .fn()
            .mockReturnValueOnce(year)
            .mockReturnValue(null),
          update: jest.fn().mockRejectedValue(new Error('error')),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return exception error 500', async () => {
      try {
        const obj = await service.remove(1, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual('Erro ao tentar deletar registro !');
      }
    });
  });

  describe('remove -> Error 500 mongo', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest
            .fn()
            .mockReturnValueOnce(year)
            .mockReturnValue(null),
          update: jest.fn().mockReturnValue(year),
        };
      });
      userLogs.create = jest.fn().mockRejectedValue(new Error());
    });

    it('should return exception error 500 mongodb', async () => {
      try {
        const obj = await service.remove(1, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar criar registro de log para deleção !',
        );
      }
    });
  });

  describe('remove -> Error 409 Conflict Year', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest
            .fn()
            .mockReturnValueOnce(year)
            .mockReturnValue(year),
          update: jest.fn().mockReturnValue(year),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return error 409 to update object', async () => {
      try {
        const obj = await service.remove(1, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(409);
        expect(error['message']).toEqual(
          'Não foi possível deletado registro !',
        );
      }
    });
  });

  describe('remove -> Error 404 not found', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return error 404 to delete object', async () => {
      try {
        const obj = await service.remove(1, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(404);
        expect(error['message']).toEqual(
          'Registro não localizado para deleção !',
        );
      }
    });
  });

  describe('createMany', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
        };
      });

      mockRepository.createQueryRunner = jest.fn().mockImplementation(() => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          release: jest.fn(),
          manager: { save: jest.fn().mockReturnValue([year]) },
        };
      });

      userLogs.create = jest.fn();
    });

    it('should return objs saves', async () => {
      const arrayObj = new CreateYearInput();

      const obj = await service.createMany([arrayObj], 1, 'I');

      expect(obj).toStrictEqual([year]);
    });
  });

  describe('createMany -> Error 500', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
        };
      });

      mockRepository.createQueryRunner = jest.fn().mockImplementation(() => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          release: jest.fn(),
          manager: { save: jest.fn().mockRejectedValue(new Error()) },
        };
      });

      userLogs.create = jest.fn();
    });

    it('should return exception to new objs', async () => {
      const arrayObj = new CreateYearInput();

      try {
        const obj = await service.createMany([arrayObj], 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar salvar novos registros !',
        );
      }
    });
  });

  describe('createMany -> Error 500 mongo', () => {
    const year = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
        };
      });

      mockRepository.createQueryRunner = jest.fn().mockImplementation(() => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          release: jest.fn(),
          manager: { save: jest.fn().mockReturnValue([year]) },
        };
      });

      userLogs.create = jest.fn().mockRejectedValue(null);
    });

    it('should return execption error 500 mongodb', async () => {
      const arrayObj = new CreateYearInput();

      try {
        const obj = await service.createMany([arrayObj], 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar savar log de novos registros !',
        );
      }
    });
  });
});
