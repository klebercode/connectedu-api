import { Test, TestingModule } from '@nestjs/testing';

import { CUSTOMER_CONNECTION_MONGO } from '../connectmongodb/connectmongodb.module';

import { UserLogsService } from './userlogs.service';
import { TestUtil } from '../common/test/test.util';

describe('UserLogsService', () => {
  let service: UserLogsService;

  const mockRepository = {
    model: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserLogsService,
        {
          provide: CUSTOMER_CONNECTION_MONGO,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = await module.resolve<UserLogsService>(UserLogsService);
  });

  afterEach(async () => {
    mockRepository.model.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    const obj = TestUtil.giveMeAvalidCreateUserLogDTO();

    beforeAll(async () => {
      mockRepository.model = jest.fn().mockImplementation(() => {
        return {
          find: jest.fn().mockImplementation(() => {
            return {
              exec: jest.fn().mockReturnValue([obj, obj]),
            };
          }),
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
    const obj = TestUtil.giveMeAvalidCreateUserLogDTO();

    beforeAll(async () => {
      mockRepository.model = jest.fn().mockImplementation(() => {
        return {
          find: jest.fn().mockImplementation(() => {
            return {
              exec: jest.fn().mockRejectedValue([obj, obj]),
            };
          }),
        };
      });
    });

    it('should return exception to list logs', async () => {
      try {
        const objs = await service.findAll();
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar lista registros de logs !',
        );
      }
    });
  });

  describe('findOneById', () => {
    const obj = TestUtil.giveMeAvalidCreateUserLogDTO();

    beforeAll(async () => {
      mockRepository.model = jest.fn().mockImplementation(() => {
        return {
          findById: jest.fn().mockImplementation(() => {
            return {
              exec: jest.fn().mockReturnValue(obj),
            };
          }),
        };
      });
    });

    it('should return one object', async () => {
      const objs = await service.findOneById('1');

      expect(objs).toStrictEqual(obj);
    });
  });

  describe('findOneById -> Error 500', () => {
    const obj = TestUtil.giveMeAvalidCreateUserLogDTO();

    beforeAll(async () => {
      mockRepository.model = jest.fn().mockImplementation(() => {
        return {
          findById: jest.fn().mockImplementation(() => {
            return {
              exec: jest.fn().mockRejectedValue(obj),
            };
          }),
        };
      });
    });

    it('should return exception to one log', async () => {
      try {
        const objs = await service.findOneById('1');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar pesquisa registro de log !',
        );
      }
    });
  });

  describe('create', () => {
    const obj = TestUtil.giveMeAvalidCreateUserLogDTO();

    beforeAll(async () => {
      mockRepository.model = jest.fn().mockImplementation(() => {
        return {
          create: jest.fn().mockReturnValue(obj),
        };
      });
    });

    it('should return one new object', async () => {
      const objNew = TestUtil.giveMeAvalidCreateUserLogDTO();

      const objs = await service.create(objNew);

      expect(objs).toStrictEqual(objNew);
    });
  });

  describe('create -> Error 500', () => {
    const obj = TestUtil.giveMeAvalidCreateUserLogDTO();

    beforeAll(async () => {
      mockRepository.model = jest.fn().mockImplementation(() => {
        return {
          create: jest.fn().mockRejectedValue(obj),
        };
      });
    });

    it('should return exception to create new log', async () => {
      const objNew = TestUtil.giveMeAvalidCreateUserLogDTO();

      try {
        const objs = await service.create(objNew);
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar salvar registro especifico de log !',
        );
      }
    });
  });

  describe('update', () => {
    const obj = TestUtil.giveMeAvalidCreateUserLogDTO();

    beforeAll(async () => {
      mockRepository.model = jest.fn().mockImplementation(() => {
        return {
          findByIdAndUpdate: jest.fn().mockReturnValue(obj),
        };
      });
    });

    it('should return one new object', async () => {
      const objNew = TestUtil.giveMeAvalidCreateUserLogDTO();

      const objs = await service.update('5f8395c31e02356864fbccc1', objNew);

      expect(objs).toStrictEqual(objNew);
    });
  });

  describe('update -> Error 500', () => {
    const obj = TestUtil.giveMeAvalidCreateUserLogDTO();

    beforeAll(async () => {
      mockRepository.model = jest.fn().mockImplementation(() => {
        return {
          findByIdAndUpdate: jest.fn().mockRejectedValue(obj),
        };
      });
    });

    it('should return exception to update log', async () => {
      const objNew = TestUtil.giveMeAvalidCreateUserLogDTO();

      try {
        const objs = await service.update('5f8395c31e02356864fbccc1', objNew);
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar salvar alteração de registro especifico de log !',
        );
      }
    });
  });

  describe('remove', () => {
    const obj = TestUtil.giveMeAvalidCreateUserLogDTO();

    beforeAll(async () => {
      mockRepository.model = jest.fn().mockImplementation(() => {
        return {
          findByIdAndRemove: jest.fn().mockReturnValue(obj),
        };
      });
    });

    it('should return one object to deleted', async () => {
      const objNew = TestUtil.giveMeAvalidCreateUserLogDTO();

      const objs = await service.remove('5f8395c31e02356864fbccc1');

      expect(objs).toStrictEqual(objNew);
    });
  });

  describe('remove -> Error 500', () => {
    const obj = TestUtil.giveMeAvalidCreateUserLogDTO();

    beforeAll(async () => {
      mockRepository.model = jest.fn().mockImplementation(() => {
        return {
          findByIdAndRemove: jest.fn().mockRejectedValue(obj),
        };
      });
    });

    it('should return exception to deleted log', async () => {
      const objNew = TestUtil.giveMeAvalidCreateUserLogDTO();

      try {
        const objs = await service.remove('5f8395c31e02356864fbccc1');
      } catch (error) {
        expect(error['status']).toEqual(500);
        expect(error['message']).toEqual(
          'Erro ao tentar deletar registro especifico de log !',
        );
      }
    });
  });
});
