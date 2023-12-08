import { ApiProperty } from '@nestjs/swagger';

export class GetHistoryPage {
  @ApiProperty()
  title: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  createdAt: Date;
}
