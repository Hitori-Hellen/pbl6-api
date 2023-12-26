import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { RequestWithIdAndTitleDto } from './dto/request-with-id-and-title.dto';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PageEntity } from './entity/page.entity';

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
    return pageTitles.map((page) => new PageEntity(page));
  }

  async getPageContent(dto: RequestWithIdAndTitleDto) {
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
        title: dto.pageId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!pageContent) {
      throw new NotFoundException('Page Not Found');
    }
    return pageContent;
  }

  async createPageContent(dto: CreatePageDto) {
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
          user: true,
        },
      });
      return page;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePageContent(dto: UpdatePageDto) {
    const updatePage = await this.prisma.page.update({
      where: {
        id: dto.pageId,
        userId: dto.userId,
      },
      data: {
        html: dto.html,
      },
    });
    return updatePage;
  }

  async deletePage(dto: RequestWithIdAndTitleDto) {
    const removePage = await this.prisma.page.deleteMany({
      where: {
        id: dto.pageId,
        userId: dto.userId,
      },
    });
    return {
      status: 200,
      data: `${removePage.count} is deleted`,
    };
  }
}
