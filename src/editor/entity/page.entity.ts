import { ApiProperty } from '@nestjs/swagger';
import { page } from '@prisma/client';
import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class PageEntity implements page {
  constructor(partial: Partial<PageEntity>) {
    Object.assign(this, partial);
  }

  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  @Exclude()
  html: string;

  @ApiProperty()
  @Exclude()
  createdAt: Date;

  @ApiProperty()
  @Exclude()
  updatedAt: Date;

  @IsString()
  @ApiProperty()
  @Exclude()
  userId: string;
}
