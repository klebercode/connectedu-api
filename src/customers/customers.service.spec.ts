import { Test, TestingModule } from '@nestjs/testing';
import { CUSTOMER_CONNECTION } from './customers.module';

import { CustomersService } from './customers.service';

import { UserLogsService } from '../userlogs/userlogs.service';
import { getConnectionToken } from '@nestjs/typeorm';
import { TestUtil } from '../common/test/test.util';

describe('CustomersService', () => {
  let service: CustomersService;

  const mockRepository = {
    getRepository: jest.fn(),
    createQueryRunner: jest.fn(),
  };

  //const mockRepository = {};

  const userLogs = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: getConnectionToken(),
          useValue: mockRepository,
        },
        {
          provide: CUSTOMER_CONNECTION,
          useValue: {},
        },
        {
          provide: UserLogsService,
          useValue: userLogs,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  afterEach(async () => {
    mockRepository.getRepository.mockReset();
    mockRepository.createQueryRunner.mockReset();
    userLogs.create.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findHost ', () => {
    const obj = TestUtil.giveMeAvalidCustomer();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(obj),
        };
      });
    });

    it('should return obj', async () => {
      const objRet = await service.findHost('customer1.local:3000');

      expect(objRet.host).toEqual(obj.host);
      expect(objRet).toStrictEqual(obj);
    });
  });

  describe('findHost -> Null', () => {
    const obj = TestUtil.giveMeAvalidCustomer();

    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
        };
      });
    });

    it('should return null to obj', async () => {
      const objRet = await service.findHost('customer1.local:3000');

      expect(objRet).toBeNull();
    });
  });

  describe('findOne string Null -> Null', () => {
    beforeAll(async () => {
      mockRepository.getRepository = jest.fn().mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
        };
      });
    });

    it('should return one specific object for input null', async () => {
      const objs = await service.findHost(null);

      expect(objs).toBeNull();
    });
  });
});
