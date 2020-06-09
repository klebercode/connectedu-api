import { Test, TestingModule } from '@nestjs/testing';
import { GroupResolver } from '../resolvers/group.resolver';

describe('GrupoResolver', () => {
  let resolver: GroupResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupResolver],
    }).compile();

    resolver = module.get<GroupResolver>(GroupResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
