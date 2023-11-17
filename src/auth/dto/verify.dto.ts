import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class VerifyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @ApiProperty()
  verifycode: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}