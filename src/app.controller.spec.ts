import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CUSTOMER_CONNECTION } from './customers/customers.module';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockRepository = {
    getRepository: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: CUSTOMER_CONNECTION,
          useValue: mockRepository,
        },
      ],
    }).compile();

    appService = await app.resolve<AppService>(AppService);
    appController = await app.resolve<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('root', () => {
    it('should return appController "Hello World"', async () => {
      const result = 'Hello World!';
      const getHello = appController.getHello();
      expect(getHello).toBe(result);
    });

    it('should return appService "Hello World"', async () => {
      const result = 'Hello World!';

      const getHello = appService.getHello();
      expect(getHello).toBe(result);
    });
  });
});
