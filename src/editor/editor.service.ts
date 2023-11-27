import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { RequestWithIdDto } from './dto/request-with-id.dto';
import { CreatePageDto } from './dto/create-page.dto';

@Injectable()
export class EditorService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPageTitle(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const pageTitles = await this.prisma.page.findMany({
      where: {
        userId: userId,
      },
    });
    return pageTitles;
  }

  async getPageContent(dto: RequestWithIdDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const pageContent = await this.prisma.page.findFirst({
      where: {
        userId: dto.userId,
        title: dto.pageTitle,
      },
      orderBy: {
        id: 'desc',
      },
    });
    if (!pageContent) {
      throw new NotFoundException('Page Not Found');
    }
    return pageContent;
  }

  async getPageHistoryChange(dto: RequestWithIdDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const pageHistory = await this.prisma.page.findMany({
      where: {
        title: dto.pageTitle,
      },
    });
    return pageHistory;
  }

  async createPage(dto: CreatePageDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const id = uuidv4();
    try {
      const page = await this.prisma.page.create({
        data: {
          id: id,
          title: dto.title,
          html: dto.html,
          userId: dto.userId,
        },
        include: {
          User: true,
        },
      });
      return page;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePage() {}

  async deletePage() {}
}
