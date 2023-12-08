import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MailService } from 'src/mail/mail.service';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { VerifyDto } from './dto/verify.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const fakeMailService = {
      sendUserConfirmation: (email: string, randomCode: string) =>
        Promise.resolve('success'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: MailService,
          useValue: fakeMailService,
        },
        PrismaService,
        JwtService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get(PrismaService);
  });

  describe('sendEmailLogin', () => {
    it('should return success', async () => {
      const dto = new LoginDto();
      dto.email = 'duongle300502@gmail.com';
      const payload = 'success';

      const tweet = await service.sendEmailLogin(dto);
      expect(tweet).toBe(payload);
    });
  });
  // describe('verifyLogin', () => {
  //   it('should return error', async () => {
  //     const dto = new VerifyDto();
  //     dto.email = 'duongle300502@gmail.com';
  //     dto.verifycode = '1111111';

  //     const tweet = await service.verifyLogin(dto);
  //     expect(tweet).toThrow();
  //   });
  // });
});
