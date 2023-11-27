import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @ApiProperty()
  userId: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  html: string;
}
