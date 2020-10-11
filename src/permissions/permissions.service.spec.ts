import { Test, TestingModule } from '@nestjs/testing';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { PermissionsService } from './permissions.service';
import { UserLogsService } from '../userlogs/userlogs.service';
import { getConnectionToken } from '@nestjs/typeorm';

describe('PermissionsService', () => {
  let service: PermissionsService;

  const mockRepositoryConnection = {
    getRepository: jest.fn(),
    createQueryRunner: jest.fn(),
  };

  const mockRepository = {};

  const userLogs = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsService,
        {
          provide: getConnectionToken(),
          useValue: mockRepositoryConnection,
        },
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

    service = module.get<PermissionsService>(PermissionsService);
  });

  afterEach(async () => {
    mockRepositoryConnection.getRepository.mockReset();
    mockRepositoryConnection.createQueryRunner.mockReset();
    userLogs.create.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
