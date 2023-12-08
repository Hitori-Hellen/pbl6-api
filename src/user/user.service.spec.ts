import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

describe('UserService', () => {
  let service: UserService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>)
      .compile();

    service = module.get<UserService>(UserService);
    prisma = module.get(PrismaService);
  });

  describe('findAllUser', () => {
    it('should be returned', async () => {
      const testUsers = [];
      await prisma.user.findMany.mockResolvedValue(testUsers);

      await expect(service.findAllUser()).resolves.toBe(testUsers);
    });
  });
});
