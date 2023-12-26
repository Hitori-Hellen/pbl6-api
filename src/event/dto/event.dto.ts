import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsBoolean } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  body: string;

  @IsDateString({}, { each: true })
  @ApiProperty()
  start: Date;

  @IsDateString({}, { each: true })
  @ApiProperty()
  end: Date;

  @IsString()
  @ApiProperty()
  state: string;

  @IsString()
  @ApiProperty()
  color: string;

  @IsString()
  @ApiProperty()
  userId: string;
}

export class UpdateEventDto {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  body: string;

  @IsBoolean()
  @ApiProperty()
  isAllday: boolean;

  @IsDateString({}, { each: true })
  @ApiProperty()
  start: Date;

  @IsDateString({}, { each: true })
  @ApiProperty()
  end: Date;

  @IsString()
  @ApiProperty()
  state: string;

  @IsBoolean()
  @ApiProperty()
  isVisible: boolean;

  @IsBoolean()
  @ApiProperty()
  isPending: boolean;

  @IsString()
  @ApiProperty()
  color: string;

  @IsString()
  @ApiProperty()
  userId: string;

  @IsString()
  @ApiProperty()
  backgroundColor: string;
}

export class GetEventIdDto {
  @IsString()
  @ApiProperty()
  eventId: string;

  @IsString()
  @ApiProperty()
  userId: string;
}

export class GetEventByWeekDto {
  @IsString()
  @ApiProperty()
  userId: string;

  @IsDateString({}, { each: true })
  @ApiProperty()
  start: Date;

  @IsDateString({}, { each: true })
  @ApiProperty()
  end: Date;
}
