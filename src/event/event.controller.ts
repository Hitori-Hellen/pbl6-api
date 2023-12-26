import {
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
  Body,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  CreateEventDto,
  UpdateEventDto,
  GetEventIdDto,
  GetEventByWeekDto,
} from './dto/event.dto';

@Controller('event')
@ApiTags('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @HttpCode(HttpStatus.OK)
  @Get('week')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getEventByWeek(@Query() query: GetEventByWeekDto) {
    return await this.eventService.getEventByWeek(
      query.userId,
      query.start,
      query.end,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('/id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getEventById(@Query() query: GetEventIdDto) {
    return await this.eventService.getEventById(query.userId, query.eventId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createEvent(@Body() dto: CreateEventDto) {
    return await this.eventService.createEvent(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('update')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async changeEventContent(@Body() dto: UpdateEventDto) {
    return await this.eventService.changeEventContent(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteEventById(@Query() query: GetEventIdDto) {
    return await this.eventService.removeEventById(query.userId, query.eventId);
  }
}
