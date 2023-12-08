import { user } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements user {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
