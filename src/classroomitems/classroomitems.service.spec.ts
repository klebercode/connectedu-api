import { Test, TestingModule } from '@nestjs/testing';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { ClassRoomItemsService } from './classroomitems.service';
import { UserLogsService } from '../userlogs/userlogs.service';

describe('ClassRoomItemsService', () => {
  let service: ClassRoomItemsService;

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
        ClassRoomItemsService,
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

    service = await module.resolve<ClassRoomItemsService>(
      ClassRoomItemsService,
    );
  });

  afterEach(async () => {
    mockRepository.getRepository.mockReset();
    mockRepository.createQueryRunner.mockReset();
    userLogs.create.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
