import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestWithIdAndTitleDto {
  @IsString()
  @ApiProperty()
  userId: string;

  @IsString()
  @ApiProperty()
  pageId: string;
}
