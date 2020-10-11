import { Test, TestingModule } from '@nestjs/testing';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { CitiesService } from './cities.service';
import { UserLogsService } from '../userlogs/userlogs.service';
import { getConnectionToken } from '@nestjs/typeorm';

describe('CitiesService', () => {
  let service: CitiesService;

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
        CitiesService,
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

    service = module.get<CitiesService>(CitiesService);
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
