import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeletePageDto {
  @IsString()
  @ApiProperty()
  userId: string;

  @IsString()
  @ApiProperty()
  pageTitle: string;
}
