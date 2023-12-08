import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAllUser() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOneUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async changeUserName(userId: string, usernameUpdate: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const verifyChangeUserame = await this.prisma.user.update({
      where: { id: userId },
      data: {
        email: undefined,
        displayName: usernameUpdate,
      },
    });
    return verifyChangeUserame;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
