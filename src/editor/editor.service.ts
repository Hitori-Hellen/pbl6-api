import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { RequestWithIdDto } from './dto/request-with-id.dto';
import { CreatePageDto } from './dto/create-page.dto';
import { GetHistoryPage } from './dto/get-history-change.dto';

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
    let response;
    for (let i = 0; i <= pageHistory.length; i++) {
      const history_temp = new GetHistoryPage();
      history_temp.title = pageHistory[i].title;
      history_temp.userId = pageHistory[i].userId;
      history_temp.createdAt = pageHistory[i].createdAt;
      response.push(history_temp);
    }
    return response;
  }

  async getPageHistoryChangeContent() {}

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

  async deletePage(pageId: string) {
    return {
      status: 200,
      data: `Page with the id ${pageId} is deleted`,
    };
  }
}
