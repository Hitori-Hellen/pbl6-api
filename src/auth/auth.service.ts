import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { VerifyDto } from './dto/verify.dto';

const randomCode = Math.floor(1000000 + Math.random() * 9999999).toString();
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mail: MailService,
  ) {}

  async sendEmailLogin(dto: LoginDto) {
    await this.mail.sendUserConfirmation(dto.email, randomCode);
    return 'success';
  }

  async verifyLogin(dto: VerifyDto) {
    if (dto.verifycode != randomCode) {
      throw new UnauthorizedException('Your code is not true');
    }

    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      const userId = uuidv4();
      try {
        const newUser = await this.prisma.user.create({
          data: {
            id: userId,
            email: dto.email,
            displayName: dto.email,
          },
        });

        return {
          accessToken: this.jwt.sign({ userId: userId }),
        };
      } catch (error) {
        throw error;
      }
    }

    return {
      accessToken: this.jwt.sign({ userId: user.id }),
    };
  }
}
