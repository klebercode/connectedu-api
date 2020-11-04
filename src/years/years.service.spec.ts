import { Test, TestingModule } from '@nestjs/testing';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { YearsService } from './years.service';
import { CreateYearInput } from './types/create-year.input';
import { UpdateYearInput } from './types/update-year.input';

import { UserLogsService } from '../userlogs/userlogs.service';
import { TestUtil } from '../common/test/test.util';

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
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          find: jest.fn().mockReturnValue([obj, obj]),
        };
      });
    });

    it('should return list all Objects', async () => {
      const objs = await service.findAll();

      expect(objs).toHaveLength(2);
      expect(objs).toStrictEqual([obj, obj]);
    });
  });

  describe('findAll -> Error 500', () => {
    const obj = TestUtil.giveMeAvalidYear();

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
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findByIds: jest.fn().mockReturnValue([obj, obj, obj]),
        };
      });
    });

    it('should return array of objects specifics', async () => {
      const objs = await service.findByIds([1, 2, 3]);

      expect(objs).toHaveLength(3);
      expect(objs).toStrictEqual([obj, obj, obj]);
    });
  });

  describe('findByIds -> Null', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findByIds: jest.fn().mockReturnValue(null),
        };
      });
    });

    it('should return null of objs specifics', async () => {
      const objs = await service.findByIds([1, 2, 3]);

      expect(objs).toBeNull();
    });
  });

  describe('findByIds -> Error 500', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findByIds: jest.fn().mockRejectedValue(new Error()),
        };
      });
    });

    it('should return error exception to objs specifics', async () => {
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
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(obj),
        };
      });
    });

    it('should return one specific Id', async () => {
      const objs = await service.findOneById(1);

      expect(objs.year).toEqual(obj.year);
      expect(objs).toStrictEqual(obj);
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
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockRejectedValue(new Error()),
        };
      });
    });

    it('should return error exception to obj specific', async () => {
      try {
        const objs = await service.findOneById(1);
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual('Erro ao tentar localizar registro !');
      }
    });
  });

  describe('findOne', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(obj),
        };
      });
    });

    it('should return one specific object for input specific', async () => {
      const objs = await service.findOne({
        where: [{ year: obj.year }],
      });

      expect(objs.year).toEqual(obj.year);
      expect(objs).toStrictEqual(obj);
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

    it('should return one specific object for input null', async () => {
      const objs = await service.findOne(null);

      expect(objs).toBeNull();
    });
  });

  describe('findOne -> Error 500', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockRejectedValue(new Error()),
        };
      });
    });

    it('should return error exception to obj specific', async () => {
      try {
        const objs = await service.findOne({
          where: [{ year: obj.year }],
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

    it('should return null to specific year not found ', async () => {
      const objs = await service.findOne({
        where: [{ year: '2032' }],
      });

      expect(objs).toBeNull();
    });
  });

  describe('findOne -> Deleted', () => {
    const obj = TestUtil.giveMeAvalidYear();
    obj.deleted = true;

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(obj),
        };
      });
    });

    it('should return null to year deleted', async () => {
      const objs = await service.findOne({
        where: [{ year: obj.year }],
      });

      expect(objs).toBeNull();
    });
  });

  describe('findOneId', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(obj),
        };
      });
    });

    it('should return one Id for input specific', async () => {
      const id = await service.findOneId({
        where: [{ year: obj.year }],
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

    it('should return null to obj specific not found', async () => {
      const objs = await service.findOneId({
        where: [{ year: '2032' }],
      });

      expect(objs).toBeNull();
    });
  });

  describe('findOneId -> Deleted', () => {
    const obj = TestUtil.giveMeAvalidYear();
    obj.deleted = true;

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(obj),
        };
      });
    });

    it('should return null to objects deleted', async () => {
      const objs = await service.findOneId({
        where: [{ year: obj.year }],
      });

      expect(objs).toBeNull();
    });
  });

  describe('findOneId -> Error 500', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockRejectedValue(new Error()),
        };
      });
    });

    it('should return error exception to obj specific', async () => {
      try {
        const objs = await service.findOneId({
          where: [{ year: obj.year }],
        });
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual('Erro ao tentar localizar registro !');
      }
    });
  });

  describe('create ', () => {
    const obj = TestUtil.giveMeAvalidYear();
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
    const obj = TestUtil.giveMeAvalidYear();

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
        await service.create(obj, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar salvar novo registro !',
        );
      }
    });
  });

  describe('create -> Error 500 mongo', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
          save: jest.fn().mockReturnValue(obj),
        };
      });
      userLogs.create = jest.fn().mockRejectedValue(new Error());
    });

    it('should return error exception to registro de log - create', async () => {
      try {
        await service.create(obj, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar salvar registro de log para novo registro !',
        );
      }
    });
  });

  describe('create -> Error 409 Conflict Year', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(obj),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return error 409 to new object', async () => {
      try {
        await service.create(obj, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(409);
        expect(error['message']).toEqual(
          'Registro com o mesmo Ano já existente !',
        );
      }
    });
  });

  describe('update', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(obj),
          update: jest.fn().mockReturnValue(obj),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return object updated', async () => {
      const objret = await service.update(1, obj, 1, 'I');

      expect(objret).toStrictEqual(obj);
    });
  });

  describe('update -> Error 500', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(obj),
          update: jest.fn().mockRejectedValue(new Error()),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return a exception to update', async () => {
      try {
        await service.update(1, obj, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual('Erro ao tentar salvar alteração !');
      }
    });
  });

  describe('update -> Error 500 mongo', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(obj),
          update: jest.fn().mockReturnValue(obj),
        };
      });
      userLogs.create = jest.fn().mockRejectedValue(new Error());
    });

    it('should return a exception error mongodb', async () => {
      try {
        await service.update(1, obj, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar criar registro de log para alteração !',
        );
      }
    });
  });

  describe('update -> Error 409 Conflict Year', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(obj),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return error 409 to update object', async () => {
      try {
        await service.update(2, obj, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(409);
        expect(error['message']).toEqual(
          'Registro com o mesmo Ano já existente !',
        );
      }
    });
  });

  describe('update -> Error 404 not found', () => {
    const obj = TestUtil.giveMeAvalidYear();

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
        await service.update(5, obj, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(404);
        expect(error['message']).toEqual('Registro não localizado !');
      }
    });
  });

  describe('remove', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest
            .fn()
            .mockReturnValueOnce(obj)
            .mockReturnValue(null),
          update: jest.fn().mockReturnValue(obj),
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
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest
            .fn()
            .mockReturnValueOnce(obj)
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
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest
            .fn()
            .mockReturnValueOnce(obj)
            .mockReturnValue(null),
          update: jest.fn().mockReturnValue(obj),
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
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest
            .fn()
            .mockReturnValueOnce(obj)
            .mockReturnValue(obj),
          update: jest.fn().mockReturnValue(obj),
        };
      });
      userLogs.create = jest.fn();
    });

    it('should return error 409 to deleted object', async () => {
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
    const obj = TestUtil.giveMeAvalidYear();

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
    const obj = TestUtil.giveMeAvalidYear();

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
          manager: { save: jest.fn().mockReturnValue([obj, obj]) },
        };
      });

      userLogs.create = jest.fn();
    });

    it('should return objs saves', async () => {
      const objInput = TestUtil.giveMeAvalidCreateYearInput();

      let arrayObj: [CreateYearInput];
      arrayObj = [objInput];
      arrayObj.push(objInput);

      const objRet = await service.createMany(arrayObj, 1, 'I');

      expect(objRet).toStrictEqual([obj, obj]);
    });
  });

  describe('createMany -> Error 500', () => {
    const obj = TestUtil.giveMeAvalidYear();

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
      const objInput = TestUtil.giveMeAvalidCreateYearInput();

      let arrayObj: [CreateYearInput];
      arrayObj = [objInput];
      arrayObj.push(objInput);

      try {
        await service.createMany(arrayObj, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar salvar novos registros !',
        );
      }
    });
  });

  describe('createMany -> Error 500 mongo', () => {
    const obj = TestUtil.giveMeAvalidYear();

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
          manager: { save: jest.fn().mockReturnValue([obj]) },
        };
      });

      userLogs.create = jest.fn().mockRejectedValue(null);
    });

    it('should return execption error 500 mongodb', async () => {
      const objInput = TestUtil.giveMeAvalidCreateYearInput();

      let arrayObj: [CreateYearInput];
      arrayObj = [objInput];
      arrayObj.push(objInput);

      try {
        await service.createMany(arrayObj, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar savar log de novos registros !',
        );
      }
    });
  });

  describe('createMany -> Error 409 Conflict Year', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(obj),
          findByIds: jest.fn().mockReturnValue([obj]),
        };
      });

      mockRepository.createQueryRunner = jest.fn().mockImplementation(() => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          release: jest.fn(),
          manager: { save: jest.fn().mockReturnValue([obj]) },
        };
      });

      userLogs.create = jest.fn();
    });

    it('should return error 409 to update object', async () => {
      const objInput = TestUtil.giveMeAvalidCreateYearInput();

      let arrayObj: [CreateYearInput];
      arrayObj = [objInput];
      arrayObj.push(objInput);

      try {
        await service.createMany(arrayObj, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(409);
        expect(error['message']).toEqual('Registros já Existentes !');
      }
    });
  });

  describe('updateMany', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
          findByIds: jest.fn().mockReturnValue([obj]),
        };
      });

      mockRepository.createQueryRunner = jest.fn().mockImplementation(() => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          release: jest.fn(),
          manager: { update: jest.fn().mockReturnValue([obj]) },
        };
      });

      userLogs.create = jest.fn();
    });

    it('should return objs saves', async () => {
      const objInput = TestUtil.giveMeAvalidUpdateYearInput();

      let arrayObj: [UpdateYearInput];
      arrayObj = [objInput];
      arrayObj.push(objInput);

      const obj = await service.updateMany(arrayObj, 1, 'I');

      expect(obj).toBe(true);
    });
  });

  describe('updateMany -> Error 500', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
          findByIds: jest.fn().mockReturnValue([obj]),
        };
      });

      mockRepository.createQueryRunner = jest.fn().mockImplementation(() => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          release: jest.fn(),
          manager: { update: jest.fn().mockRejectedValue([obj]) },
        };
      });

      userLogs.create = jest.fn();
    });

    it('should return exception error 500', async () => {
      const arrayObj = new UpdateYearInput();

      try {
        const obj = await service.updateMany([arrayObj], 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar salvar alteração dos regsitros !',
        );
      }
    });
  });

  describe('updateMany -> Error 500 mongo', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
          findByIds: jest.fn().mockReturnValue([obj]),
        };
      });

      mockRepository.createQueryRunner = jest.fn().mockImplementation(() => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          release: jest.fn(),
          manager: { update: jest.fn().mockReturnValue([obj]) },
        };
      });

      userLogs.create = jest.fn().mockRejectedValue(null);
    });

    it('should return exception error 500 mongodb', async () => {
      const arrayObj = new UpdateYearInput();

      try {
        const obj = await service.updateMany([arrayObj], 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar salvar log de alterações dos regitros !',
        );
      }
    });
  });

  describe('updateMany -> Objects Deleted', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
          findByIds: jest.fn().mockReturnValue([]),
        };
      });

      mockRepository.createQueryRunner = jest.fn().mockImplementation(() => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          release: jest.fn(),
          manager: { update: jest.fn().mockReturnValue([obj]) },
        };
      });

      userLogs.create = jest.fn().mockReturnValue(null);
    });

    it('should return false to updated objects deleted', async () => {
      const arrayObj = new UpdateYearInput();

      const obj = await service.updateMany([arrayObj], 1, 'I');

      expect(obj).toBe(false);
    });
  });

  describe('updateMany -> Error 409 Conflict Year', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(obj),
          findByIds: jest.fn().mockReturnValue([obj]),
        };
      });

      mockRepository.createQueryRunner = jest.fn().mockImplementation(() => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          release: jest.fn(),
          manager: { update: jest.fn().mockReturnValue([obj]) },
        };
      });

      userLogs.create = jest.fn();
    });

    it('should return error 409 to update object', async () => {
      const objInput = TestUtil.giveMeAvalidUpdateYearInput();

      let arrayObj: [UpdateYearInput];
      arrayObj = [objInput];
      arrayObj.push(objInput);

      try {
        const obj = await service.updateMany(arrayObj, 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(409);
        expect(error['message']).toEqual('Registros já Existentes !');
      }
    });
  });

  describe('removeMany', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findByIds: jest.fn().mockReturnValue([obj]),
        };
      });

      mockRepository.createQueryRunner = jest.fn().mockImplementation(() => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          release: jest.fn(),
          manager: { update: jest.fn().mockReturnValue([obj]) },
        };
      });

      userLogs.create = jest.fn();
    });

    it('should return true to objects deleted', async () => {
      const obj = await service.removeMany([1, 2, 3, 4], 1, 'I');

      expect(obj).toBe(true);
    });
  });

  describe('removeMany -> Error 500', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findByIds: jest.fn().mockReturnValue([obj]),
        };
      });

      mockRepository.createQueryRunner = jest.fn().mockImplementation(() => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          release: jest.fn(),
          manager: { update: jest.fn().mockRejectedValue([obj]) },
        };
      });

      userLogs.create = jest.fn();
    });

    it('should return exception to objects deleted', async () => {
      try {
        const obj = await service.removeMany([1, 2, 3, 4], 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar deletar os registros !',
        );
      }
    });
  });

  describe('removeMany -> Error 500 mongo', () => {
    const obj = TestUtil.giveMeAvalidYear();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findByIds: jest.fn().mockReturnValue([obj]),
        };
      });

      mockRepository.createQueryRunner = jest.fn().mockImplementation(() => {
        return {
          connect: jest.fn(),
          startTransaction: jest.fn(),
          commitTransaction: jest.fn(),
          rollbackTransaction: jest.fn(),
          release: jest.fn(),
          manager: { update: jest.fn().mockReturnValue([obj]) },
        };
      });

      userLogs.create = jest.fn().mockRejectedValue(null);
    });

    it('should return exception error 500 mongodb', async () => {
      try {
        const obj = await service.removeMany([1, 2, 3, 4], 1, 'I');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar criar registros de log para deleção !',
        );
      }
    });
  });
});
