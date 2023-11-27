import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestWithIdDto {
  @IsString()
  @ApiProperty()
  userId: string;

  @IsString()
  @ApiProperty()
  pageTitle: string;
}
