import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async getEventByWeek(userId: string, startDay: Date, endDay: Date) {
    const startDayFormat = new Date(startDay).toISOString();
    const endDayFormat = new Date(endDay).toISOString();
    const events = await this.prisma.event.findMany({
      where: {
        userId: userId,
        start: {
          gte: startDayFormat,
        },
        end: {
          lte: endDayFormat,
        },
      },
    });
    return events;
  }

  async getEventByMonth() {}

  async getEventById(userId: string, eventId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId,
        userId: userId,
      },
    });
    return event;
  }

  async createEvent(dto: CreateEventDto) {
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
      const event = await this.prisma.event.create({
        data: {
          id: id,
          title: dto.title,
          body: dto.body,
          start: dto.start,
          end: dto.end,
          state: dto.state,
          color: dto.color,
          userId: dto.userId,
        },
        include: {
          user: true,
        },
      });
      return {
        status: 200,
        data: `Event with title ${event.title} is created`,
      };
    } catch (error) {
      throw error;
    }
  }

  async changeEventContent(dto: UpdateEventDto) {
    try {
      await this.prisma.event.update({
        where: {
          id: dto.id,
          userId: dto.userId,
        },
        data: {
          title: dto.title,
          body: dto.body,
          isAllday: dto.isAllday,
          start: dto.start,
          end: dto.end,
          state: dto.state,
          isVisible: dto.isVisible,
          isPending: dto.isPending,
          color: dto.color,
          backgroundColor: dto.backgroundColor,
        },
      });
    } catch (error) {
      throw error;
    }
    return {
      data: 'Update success',
    };
  }

  async removeEventById(userId: string, eventId: string) {
    try {
      await this.prisma.event.delete({
        where: {
          id: eventId,
          userId: userId,
        },
      });
      return {
        status: 200,
        data: `Event is deleted`,
      };
    } catch (error) {
      throw error;
    }
  }
}
